import { useEffect, useRef, useState } from "react";
import { RefreshCw, Trash2, Eye, EyeOff, Upload, ImagePlus } from "lucide-react";
import { adminBannersApi, type Banner } from "@/lib/api";
import { Spinner } from "./shared";

export function SectionBanners() {
  const [items,      setItems]      = useState<Banner[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [uploading,  setUploading]  = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [uploadErr,  setUploadErr]  = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try { const res = await adminBannersApi.list(); setItems(res.data); }
    catch {} finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadErr("");
    setUploading(true);
    try {
      const res = await adminBannersApi.upload(Array.from(files));
      setItems((prev) => [...prev, ...res.data]);
    } catch (err: any) {
      setUploadErr(err.message ?? "Erreur lors de l'upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleToggle(id: number) {
    setTogglingId(id);
    try {
      const res = await adminBannersApi.toggle(id);
      setItems((prev) => prev.map((b) => b.id === id ? res.data : b));
    } catch {} finally { setTogglingId(null); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Supprimer cette bannière ?")) return;
    setDeletingId(id);
    try {
      await adminBannersApi.delete(id);
      setItems((prev) => prev.filter((b) => b.id !== id));
    } catch {} finally { setDeletingId(null); }
  }

  const active = items.filter((b) => b.is_active).length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Bannières hero ({items.length} · {active} actives)</p>
        <div className="flex items-center gap-2">
          <button onClick={load} disabled={loading}
            className="inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
            <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} /> ACTUALISER
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-primary px-3 py-2 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 disabled:opacity-50">
            {uploading
              ? <><RefreshCw className="size-3 animate-spin" /> UPLOAD...</>
              : <><Upload className="size-3" /> AJOUTER DES IMAGES</>}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      {uploadErr && (
        <p className="mb-4 bg-destructive/10 px-4 py-3 text-sm text-destructive">{uploadErr}</p>
      )}

      {/* Zone de drop */}
      <DropZone onFiles={handleFiles} uploading={uploading} onClick={() => inputRef.current?.click()} />

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : items.length === 0 ? (
        <div className="mt-4 border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucune bannière. Cliquez sur AJOUTER ou déposez des images ci-dessus.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <div key={b.id} className={`group relative overflow-hidden border ${b.is_active ? "border-border" : "border-border/50 opacity-60"}`}>
              <img
                src={b.image_url}
                alt={b.title ?? `Bannière #${b.id}`}
                className="h-44 w-full object-cover"
              />

              {/* Badge statut */}
              <div className="absolute left-2 top-2">
                <span className={`rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${
                  b.is_active
                    ? "border-green-500/40 bg-green-500/80 text-white"
                    : "border-border bg-black/60 text-white/70"}`}>
                  {b.is_active ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              {/* Ordre */}
              <div className="absolute right-2 top-2">
                <span className="rounded-full bg-black/60 px-2 py-0.5 font-display text-[10px] text-white/80">
                  #{b.order}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-border bg-card px-3 py-2">
                <p className="truncate text-xs text-muted-foreground max-w-[140px]">
                  {b.title ?? `Bannière ${b.id}`}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggle(b.id)}
                    disabled={togglingId === b.id}
                    className="p-1.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
                    title={b.is_active ? "Désactiver" : "Activer"}>
                    {b.is_active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    disabled={deletingId === b.id}
                    className="p-1.5 text-muted-foreground hover:text-destructive disabled:opacity-40 transition-colors"
                    title="Supprimer">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DropZone({ onFiles, uploading, onClick }: {
  onFiles: (f: FileList) => void;
  uploading: boolean;
  onClick: () => void;
}) {
  const [over, setOver] = useState(false);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setOver(false);
    if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  }

  return (
    <div
      onClick={onClick}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={onDrop}
      className={`mb-2 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed py-8 transition-colors ${
        over ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-card"
      } ${uploading ? "pointer-events-none opacity-50" : ""}`}
    >
      <ImagePlus className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Cliquez ou glissez-déposez vos images ici</p>
      <p className="text-xs text-muted-foreground/60">JPG · PNG · WebP · max 5 Mo par image</p>
    </div>
  );
}
