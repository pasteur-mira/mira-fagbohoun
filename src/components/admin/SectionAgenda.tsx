import { useEffect, useState } from "react";
import { Trash2, RefreshCw, X, PlusCircle, Pencil, Eye, EyeOff } from "lucide-react";
import { adminAgendaApi, type AgendaEvent, type AgendaEventPayload, type AgendaType } from "@/lib/api";
import { Spinner } from "./shared";

const TYPE_OPTIONS: { value: AgendaType; label: string }[] = [
  { value: "culte",      label: "Culte" },
  { value: "conference", label: "Conférence" },
  { value: "retraite",   label: "Retraite" },
  { value: "evenement",  label: "Événement" },
  { value: "reseau_icc", label: "Réseau ICC" },
];

const EMPTY_FORM: AgendaEventPayload = { date: "", time: "", title: "", type: "culte", place: "", is_published: false };

const inputCls = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls = "eyebrow block text-[10px]";

export function SectionAgenda() {
  const [events,     setEvents]     = useState<AgendaEvent[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editing,    setEditing]    = useState<AgendaEvent | null>(null);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [form,       setForm]       = useState<AgendaEventPayload>(EMPTY_FORM);
  const [formError,  setFormError]  = useState("");

  async function load() {
    setLoading(true);
    try { const res = await adminAgendaApi.list(); setEvents(res.data); }
    catch {} finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(e: AgendaEvent) {
    setEditing(e);
    setForm({ date: e.date, time: e.time, title: e.title, type: e.type, place: e.place, is_published: e.is_published });
    setFormError("");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const res = await adminAgendaApi.update(editing.id, form);
        setEvents((prev) => prev.map((ev) => ev.id === editing.id ? res.data : ev));
      } else {
        const res = await adminAgendaApi.create(form);
        setEvents((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(id: number) {
    setTogglingId(id);
    try {
      const res = await adminAgendaApi.togglePublish(id);
      setEvents((prev) => prev.map((ev) => ev.id === id ? res.data : ev));
    } catch {} finally { setTogglingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cet événement ?")) return;
    setDeletingId(id);
    try {
      await adminAgendaApi.delete(id);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch {} finally { setDeletingId(null); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Agenda ({events.length})</p>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading}
            className="inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
            <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} /> ACTUALISER
          </button>
          <button onClick={openCreate}
            className="inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 transition-opacity">
            <PlusCircle className="size-3" /> AJOUTER
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : events.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucun événement. Cliquez sur AJOUTER pour créer le premier.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Date</th>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Titre</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Lieu</th>
                <th className="px-4 py-3 text-center eyebrow text-[10px]">Statut</th>
                <th className="px-4 py-3 text-right eyebrow text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((ev) => (
                <tr key={ev.id} className="hover:bg-card transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{ev.date_label}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{ev.title}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{ev.place}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(ev.id)}
                      disabled={togglingId === ev.id}
                      title={ev.is_published ? "Masquer" : "Publier"}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${ev.is_published
                          ? "border-green-500/40 text-green-600 hover:bg-green-50"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                      {ev.is_published
                        ? <><Eye className="size-3" /> PUBLIÉ</>
                        : <><EyeOff className="size-3" /> MASQUÉ</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(ev)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(ev.id)} disabled={deletingId === ev.id}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-40">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal formulaire */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10">
          <div className="w-full max-w-lg border border-border bg-background p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-base text-foreground">
                {editing ? "MODIFIER L'ÉVÉNEMENT" : "NOUVEL ÉVÉNEMENT"}
              </p>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {formError && <p className="mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive">{formError}</p>}

            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Titre *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls} placeholder="Culte du dimanche" />
              </div>
              <div>
                <label className={labelCls}>Date * (AAAA-MM-JJ)</label>
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Heure / Période *</label>
                <input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className={inputCls} placeholder="10h00" />
              </div>
              <div>
                <label className={labelCls}>Type *</label>
                <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as AgendaType })}
                  className={inputCls}>
                  {TYPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Lieu *</label>
                <input required value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })}
                  className={inputCls} placeholder="ICC Occitanie, Toulouse" />
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="is_published" checked={!!form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 accent-primary" />
                <label htmlFor="is_published" className="text-sm text-foreground cursor-pointer">
                  Publier immédiatement
                </label>
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors">
                  ANNULER
                </button>
                <button type="submit" disabled={saving}
                  className="bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity">
                  {saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "CRÉER"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
