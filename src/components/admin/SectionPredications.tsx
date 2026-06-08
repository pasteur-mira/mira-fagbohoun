import { useEffect, useState } from "react";
import { Trash2, RefreshCw, X, PlusCircle, Pencil, Eye, EyeOff } from "lucide-react";
import { adminPredicationsApi, getYoutubeThumbnail, type Predication, type PredicationPayload } from "@/lib/api";
import { Spinner } from "./shared";

const EMPTY_PRED: PredicationPayload = { title: "", category: "", date: "", youtube_url: "", is_published: false };

const inputCls = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls = "eyebrow block text-[10px]";

export function SectionPredications() {
  const [items,      setItems]      = useState<Predication[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editing,    setEditing]    = useState<Predication | null>(null);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [form,       setForm]       = useState<PredicationPayload>(EMPTY_PRED);
  const [formError,  setFormError]  = useState("");

  async function load() {
    setLoading(true);
    try { const res = await adminPredicationsApi.list(); setItems(res.data); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null); setForm(EMPTY_PRED); setFormError(""); setShowForm(true);
  }
  function openEdit(p: Predication) {
    setEditing(p);
    setForm({ title: p.title, category: p.category, date: p.date, youtube_url: p.youtube_url ?? "", is_published: p.is_published });
    setFormError(""); setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setFormError("");
    const payload = { ...form, youtube_url: form.youtube_url || null };
    try {
      if (editing) {
        const res = await adminPredicationsApi.update(editing.id, payload);
        setItems((prev) => prev.map((p) => p.id === editing.id ? res.data : p));
      } else {
        const res = await adminPredicationsApi.create(payload);
        setItems((prev) => [res.data, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) {
      setFormError(err.message ?? "Erreur lors de la sauvegarde.");
    } finally { setSaving(false); }
  }

  async function handleToggle(id: number) {
    setTogglingId(id);
    try {
      const res = await adminPredicationsApi.togglePublish(id);
      setItems((prev) => prev.map((p) => p.id === id ? res.data : p));
    } catch {} finally { setTogglingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette prédication ?")) return;
    setDeletingId(id);
    try {
      await adminPredicationsApi.delete(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch {} finally { setDeletingId(null); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Prédications ({items.length})</p>
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
          Aucune prédication. Cliquez sur AJOUTER pour commencer.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Titre</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Catégorie</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Date</th>
                <th className="px-4 py-3 text-center eyebrow text-[10px]">Statut</th>
                <th className="px-4 py-3 text-right eyebrow text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-card transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground max-w-[200px] truncate">{p.title}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{p.category}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{p.date_label}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(p.id)}
                      disabled={togglingId === p.id}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${p.is_published
                          ? "border-green-500/40 text-green-600 hover:bg-green-50"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                      {p.is_published ? <><Eye className="size-3" /> PUBLIÉ</> : <><EyeOff className="size-3" /> MASQUÉ</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={deletingId === p.id}
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
                {editing ? "MODIFIER LA PRÉDICATION" : "NOUVELLE PRÉDICATION"}
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
                  className={inputCls} placeholder="L'autorité spirituelle aujourd'hui" />
              </div>
              <div>
                <label className={labelCls}>Catégorie *</label>
                <input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={inputCls} placeholder="Enseignement" />
              </div>
              <div>
                <label className={labelCls}>Date * (AAAA-MM-JJ)</label>
                <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Lien YouTube</label>
                <input type="url" value={form.youtube_url ?? ""} onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                  className={inputCls} placeholder="https://youtu.be/xxxxx" />
                {form.youtube_url && getYoutubeThumbnail(form.youtube_url) && (
                  <div className="mt-3">
                    <p className="eyebrow mb-1 text-[9px] text-muted-foreground">APERÇU MINIATURE</p>
                    <img src={getYoutubeThumbnail(form.youtube_url)!} alt="Aperçu miniature" className="h-28 w-48 object-cover border border-border" />
                  </div>
                )}
              </div>
              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="pred_published" checked={!!form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 accent-primary" />
                <label htmlFor="pred_published" className="text-sm text-foreground cursor-pointer">
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
