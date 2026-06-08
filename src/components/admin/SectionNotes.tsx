import { useEffect, useRef, useState } from "react";
import { Trash2, RefreshCw, X, PlusCircle, Pencil, Eye, EyeOff, FileText, Upload } from "lucide-react";
import { adminNotesApi, formatSize, type Note, type NotePayload } from "@/lib/api";
import { Spinner } from "./shared";

const EMPTY_FORM: NotePayload & { _file?: File | null } = {
  title: "", category: "", date: "", description: "", is_published: false,
};

const inputCls = "mt-2 w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none";
const labelCls = "eyebrow block text-[10px]";

export function SectionNotes() {
  const [items,      setItems]      = useState<Note[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [editing,    setEditing]    = useState<Note | null>(null);
  const [saving,     setSaving]     = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [form,       setForm]       = useState<NotePayload>({ ...EMPTY_FORM });
  const [file,       setFile]       = useState<File | null>(null);
  const [formError,  setFormError]  = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try { const res = await adminNotesApi.list(); setItems(res.data); }
    catch {} finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY_FORM });
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
    setFormError("");
    setShowForm(true);
  }

  function openEdit(n: Note) {
    setEditing(n);
    setForm({ title: n.title, category: n.category, date: n.date, description: n.description ?? "", is_published: n.is_published });
    setFile(null);
    setFormError("");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const res = await adminNotesApi.update(editing.id, form);
        setItems((prev) => prev.map((n) => n.id === editing.id ? res.data : n));
      } else {
        if (!file) { setFormError("Veuillez sélectionner un fichier PDF."); setSaving(false); return; }
        const fd = new FormData();
        fd.append("file", file);
        fd.append("title", form.title ?? "");
        fd.append("category", form.category ?? "");
        fd.append("date", form.date ?? "");
        if (form.description) fd.append("description", form.description);
        fd.append("is_published", form.is_published ? "1" : "0");
        const res = await adminNotesApi.create(fd);
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
      const res = await adminNotesApi.togglePublish(id);
      setItems((prev) => prev.map((n) => n.id === id ? res.data : n));
    } catch {} finally { setTogglingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette note et son fichier PDF ?")) return;
    setDeletingId(id);
    try {
      await adminNotesApi.delete(id);
      setItems((prev) => prev.filter((n) => n.id !== id));
    } catch {} finally { setDeletingId(null); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Notes & Études ({items.length})</p>
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
      ) : items.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucune note. Cliquez sur AJOUTER pour uploader le premier PDF.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Titre</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Catégorie</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Taille</th>
                <th className="px-4 py-3 text-center eyebrow text-[10px]">Statut</th>
                <th className="px-4 py-3 text-right eyebrow text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((n) => (
                <tr key={n.id} className="hover:bg-card transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 shrink-0 text-primary" />
                      <span className="font-medium text-foreground max-w-[180px] truncate">{n.title}</span>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{n.category}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{formatSize(n.file_size)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(n.id)}
                      disabled={togglingId === n.id}
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 font-display text-[10px] tracking-[0.14em] transition-colors disabled:opacity-40
                        ${n.is_published
                          ? "border-green-500/40 text-green-600 hover:bg-green-50"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"}`}>
                      {n.is_published ? <><Eye className="size-3" /> PUBLIÉ</> : <><EyeOff className="size-3" /> MASQUÉ</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => openEdit(n)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => handleDelete(n.id)} disabled={deletingId === n.id}
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
                {editing ? "MODIFIER LA NOTE" : "NOUVELLE NOTE"}
              </p>
              <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {formError && <p className="mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive">{formError}</p>}

            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelCls}>Titre *</label>
                <input required value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputCls} placeholder="Étude sur la grâce" />
              </div>
              <div>
                <label className={labelCls}>Catégorie *</label>
                <input required value={form.category ?? ""} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={inputCls} placeholder="Étude biblique" />
              </div>
              <div>
                <label className={labelCls}>Date * (AAAA-MM-JJ)</label>
                <input required type="date" value={form.date ?? ""} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputCls} />
              </div>
              <div className="col-span-2">
                <label className={labelCls}>Description</label>
                <textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} className={inputCls} placeholder="Courte description du contenu..." />
              </div>

              {/* Fichier PDF — uniquement à la création */}
              {!editing && (
                <div className="col-span-2">
                  <label className={labelCls}>Fichier PDF *</label>
                  <div className="mt-2">
                    <label className="flex cursor-pointer items-center gap-3 border border-dashed border-border bg-background px-4 py-4 hover:border-primary transition-colors">
                      <Upload className="size-5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        {file ? (
                          <>
                            <p className="truncate text-sm text-foreground">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">Cliquer pour sélectionner un PDF (max 20 Mo)</p>
                        )}
                      </div>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,application/pdf"
                        className="sr-only"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                  </div>
                </div>
              )}

              <div className="col-span-2 flex items-center gap-3">
                <input type="checkbox" id="note_published" checked={!!form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                  className="h-4 w-4 accent-primary" />
                <label htmlFor="note_published" className="text-sm text-foreground cursor-pointer">
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
                  {saving ? "SAUVEGARDE..." : editing ? "ENREGISTRER" : "UPLOADER"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
