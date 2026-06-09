import { useEffect, useState } from "react";
import { Trash2, RefreshCw, X, PlusCircle, Pencil, Eye, EyeOff } from "lucide-react";
import { adminRecurringEventsApi, type RecurringEvent, type RecurringEventPayload, type RecurringEventType } from "@/lib/api";
import { Spinner } from "./shared";

const DAY_OPTIONS = [
  { value: "monday",    label: "Lundi" },
  { value: "tuesday",   label: "Mardi" },
  { value: "wednesday", label: "Mercredi" },
  { value: "thursday",  label: "Jeudi" },
  { value: "friday",    label: "Vendredi" },
  { value: "saturday",  label: "Samedi" },
  { value: "sunday",    label: "Dimanche" },
];

const TYPE_OPTIONS: { value: RecurringEventType; label: string }[] = [
  { value: "culte",      label: "Culte" },
  { value: "priere",     label: "Prière" },
  { value: "conference", label: "Conférence" },
  { value: "jeune",      label: "Jeûne" },
  { value: "evenement",  label: "Événement" },
];

const EMPTY: RecurringEventPayload = {
  title: "", day_of_week: "sunday", times: [""], time_end: "",
  place: "", address: "", type: "culte", order: 0, is_published: false,
};

const inputCls = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls = "eyebrow block text-[10px]";

export function SectionRecurringEvents() {
  const [items,      setItems]      = useState<RecurringEvent[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editing,    setEditing]    = useState<RecurringEvent | null>(null);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [form,       setForm]       = useState<RecurringEventPayload>(EMPTY);
  const [formError,  setFormError]  = useState("");

  async function load() {
    setLoading(true);
    try { const res = await adminRecurringEventsApi.list(); setItems(res.data); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null); setForm(EMPTY); setFormError(""); setShowForm(true);
  }
  function openEdit(r: RecurringEvent) {
    setEditing(r);
    setForm({
      title: r.title, day_of_week: r.day_of_week,
      times: r.times.length > 0 ? r.times : [""],
      time_end: r.time_end ?? "", place: r.place,
      address: r.address ?? "", type: r.type,
      order: r.order, is_published: r.is_published,
    });
    setFormError(""); setShowForm(true);
  }

  function setTime(idx: number, val: string) {
    setForm((f) => {
      const times = [...f.times];
      times[idx] = val;
      return { ...f, times };
    });
  }
  function addTime() { setForm((f) => ({ ...f, times: [...f.times, ""] })); }
  function removeTime(idx: number) {
    setForm((f) => ({ ...f, times: f.times.filter((_, i) => i !== idx) }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setFormError("");
    const payload: RecurringEventPayload = {
      ...form,
      times: form.times.map((t) => t.trim()).filter(Boolean),
      time_end: form.time_end || null,
      address: form.address || undefined,
    };
    try {
      if (editing) {
        const res = await adminRecurringEventsApi.update(editing.id, payload);
        setItems((prev) => prev.map((r) => r.id === editing.id ? res.data : r));
      } else {
        const res = await adminRecurringEventsApi.create(payload);
        setItems((prev) => [...prev, res.data]);
      }
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally { setSaving(false); }
  }

  async function handleToggle(id: number) {
    setTogglingId(id);
    try {
      const res = await adminRecurringEventsApi.togglePublish(id);
      setItems((prev) => prev.map((r) => r.id === id ? res.data : r));
    } catch {} finally { setTogglingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cet événement récurrent ?")) return;
    setDeletingId(id);
    try {
      await adminRecurringEventsApi.delete(id);
      setItems((prev) => prev.filter((r) => r.id !== id));
    } catch {} finally { setDeletingId(null); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Programme hebdomadaire ({items.length})</p>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading}
            className="inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
            <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} /> ACTUALISER
          </button>
          <button onClick={openCreate}
            className="inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90">
            <PlusCircle className="size-3" /> AJOUTER
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : items.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucun événement récurrent. Cliquez sur AJOUTER pour commencer.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Titre</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Jour</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Horaires</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Lieu</th>
                <th className="px-4 py-3 text-center eyebrow text-[10px]">Statut</th>
                <th className="px-4 py-3 text-right eyebrow text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((r) => (
                <tr key={r.id} className="hover:bg-card transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground max-w-40 truncate">{r.title}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{r.day_label}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{r.times_label}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell max-w-40 truncate">{r.place}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(r.id)}
                      disabled={togglingId === r.id}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${r.is_published
                          ? "border-green-500/40 text-green-600 hover:bg-green-50"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                      {r.is_published ? <><Eye className="size-3" /> PUBLIÉ</> : <><EyeOff className="size-3" /> MASQUÉ</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(r)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(r.id)} disabled={deletingId === r.id}
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-10">
          <div className="w-full max-w-lg border border-border bg-background p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-base text-foreground">
                {editing ? "MODIFIER L'ÉVÉNEMENT" : "NOUVEL ÉVÉNEMENT RÉCURRENT"}
              </p>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {formError && <p className="mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive">{formError}</p>}

            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              {/* Titre */}
              <div className="col-span-2">
                <label className={labelCls}>Titre *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls} placeholder="Cultes de Célébration" />
              </div>

              {/* Jour + Type */}
              <div>
                <label className={labelCls}>Jour *</label>
                <select required value={form.day_of_week} onChange={(e) => setForm({ ...form, day_of_week: e.target.value })}
                  className={inputCls}>
                  {DAY_OPTIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Type *</label>
                <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as RecurringEventType })}
                  className={inputCls}>
                  {TYPE_OPTIONS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              {/* Horaires */}
              <div className="col-span-2">
                <label className={labelCls}>Horaires de début *</label>
                {form.times.map((t, idx) => (
                  <div key={idx} className="mt-2 flex items-center gap-2">
                    <input
                      value={t}
                      onChange={(e) => setTime(idx, e.target.value)}
                      className="flex-1 border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                      placeholder="9h00"
                    />
                    {form.times.length > 1 && (
                      <button type="button" onClick={() => removeTime(idx)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="size-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addTime}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent hover:underline">
                  <PlusCircle className="size-3" /> Ajouter un horaire
                </button>
              </div>

              {/* Heure de fin */}
              <div>
                <label className={labelCls}>Heure de fin (optionnel)</label>
                <input value={form.time_end ?? ""} onChange={(e) => setForm({ ...form, time_end: e.target.value })}
                  className={inputCls} placeholder="21h00" />
              </div>

              {/* Ordre */}
              <div>
                <label className={labelCls}>Ordre d'affichage</label>
                <input type="number" min={0} value={form.order ?? 0}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className={inputCls} />
              </div>

              {/* Lieu */}
              <div className="col-span-2">
                <label className={labelCls}>Lieu *</label>
                <input required value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })}
                  className={inputCls} placeholder="Impact Centre Chrétien" />
              </div>

              {/* Adresse */}
              <div className="col-span-2">
                <label className={labelCls}>Adresse (optionnel)</label>
                <input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputCls} placeholder="22 rue Théron de Montaugé, 31200" />
              </div>

              {/* Publié */}
              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="rec_published" checked={!!form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 accent-primary" />
                <label htmlFor="rec_published" className="text-sm text-foreground cursor-pointer">
                  Publier immédiatement
                </label>
              </div>

              <div className="col-span-2 flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)}
                  className="border border-border px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors">
                  ANNULER
                </button>
                <button type="submit" disabled={saving}
                  className="bg-primary px-5 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50">
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
