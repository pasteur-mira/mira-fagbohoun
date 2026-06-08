import { useEffect, useState } from "react";
import { Trash2, RefreshCw, X } from "lucide-react";
import { adminContactApi, type ContactMessage } from "@/lib/api";
import { Spinner } from "./shared";

export function SectionContacts() {
  const [messages,   setMessages]   = useState<ContactMessage[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try { const res = await adminContactApi.list(); setMessages(res.data); }
    catch {}
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: number) {
    if (!confirm("Supprimer ce message ?")) return;
    setDeletingId(id);
    try {
      await adminContactApi.delete(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {}
    finally { setDeletingId(null); }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Messages ({messages.length})</p>
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
          <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} /> ACTUALISER
        </button>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : messages.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucun message pour le moment.
        </div>
      ) : (
        <div className="border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 text-left eyebrow text-[10px]">Nom</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Email</th>
                <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right eyebrow text-[10px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((m) => (
                <tr key={m.id} className="hover:bg-card transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">
                    <button onClick={() => setSelected(m)} className="hover:text-primary text-left">{m.full_name}</button>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{m.email}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                    {new Date(m.created_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => setSelected(m)}
                        className="px-3 py-1 font-display text-[9px] tracking-[0.18em] border border-border hover:bg-card transition-colors">
                        VOIR
                      </button>
                      <button onClick={() => handleDelete(m.id)} disabled={deletingId === m.id}
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

      {/* Modal détail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg border border-border bg-background p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg text-foreground">{selected.full_name}</p>
                <p className="text-sm text-muted-foreground">{selected.email}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {new Date(selected.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="shrink-0 text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <p className="whitespace-pre-wrap text-sm text-foreground leading-relaxed border-t border-border pt-4">
              {selected.message}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => handleDelete(selected.id)} disabled={deletingId === selected.id}
                className="inline-flex items-center gap-2 border border-destructive px-4 py-2 font-display text-[10px] tracking-[0.18em] text-destructive hover:bg-destructive hover:text-white transition-colors disabled:opacity-40">
                <Trash2 className="size-3" /> SUPPRIMER
              </button>
              <button onClick={() => setSelected(null)}
                className="border border-border px-4 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors">
                FERMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
