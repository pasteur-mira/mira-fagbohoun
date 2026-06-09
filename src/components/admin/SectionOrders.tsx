import { useEffect, useRef, useState } from "react";
import { RefreshCw, X, ShoppingBag, ExternalLink, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { adminOrdersApi, type Order } from "@/lib/api";
import { Spinner } from "./shared";

const STATUS_STYLES: Record<Order["status"], string> = {
  pending:   "border-yellow-500/40 bg-yellow-500/10 text-yellow-600",
  paid:      "border-green-500/40 bg-green-500/10 text-green-600",
  failed:    "border-destructive/40 bg-destructive/10 text-destructive",
  cancelled: "border-border bg-muted text-muted-foreground",
  delivered: "border-accent/40 bg-accent/10 text-accent",
};

const STATUS_OPTIONS: { value: Order["status"]; label: string }[] = [
  { value: "delivered", label: "Livré" },
  { value: "cancelled", label: "Annulé" },
];

function StatusDropdown({ order, onUpdated }: { order: Order; onUpdated: (o: Order) => void }) {
  const [open,   setOpen]   = useState(false);
  const [saving, setSaving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  async function pick(status: Order["status"]) {
    if (status === order.status) { setOpen(false); return; }
    setSaving(true);
    try {
      const res = await adminOrdersApi.updateStatus(order.id, status);
      onUpdated(res.data);
    } catch {} finally { setSaving(false); setOpen(false); }
  }

  return (
    <div ref={ref} className="relative inline-flex items-center gap-1">
      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${STATUS_STYLES[order.status]}`}>
        {order.status_label}
      </span>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={saving}
        className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
        title="Changer le statut"
      >
        {saving ? <RefreshCw className="size-3 animate-spin" /> : <ChevronDown className="size-3" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-32.5 border border-border bg-background shadow-lg">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => pick(opt.value)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left font-display text-[10px] tracking-[0.12em] transition-colors hover:bg-card
                ${opt.value === order.status ? "text-foreground font-semibold" : "text-muted-foreground"}`}
            >
              <span className={`size-2 rounded-full border ${STATUS_STYLES[opt.value]}`} />
              {opt.label}
              {opt.value === order.status && <span className="ml-auto text-primary">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionOrders() {
  const [items,         setItems]         = useState<Order[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [page,          setPage]          = useState(1);
  const [lastPage,      setLastPage]      = useState(1);
  const [total,         setTotal]         = useState(0);
  const [selected,      setSelected]      = useState<Order | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  async function load(p = page) {
    setLoading(true);
    try {
      const res = await adminOrdersApi.list(p, 15);
      setItems(res.data);
      setPage(res.current_page);
      setLastPage(res.last_page);
      setTotal(res.total);
    } catch {} finally { setLoading(false); }
  }

  useEffect(() => { load(1); }, []);

  function updateItem(updated: Order) {
    setItems((prev) => prev.map((o) => o.id === updated.id ? updated : o));
    if (selected?.id === updated.id) setSelected(updated);
  }

  async function openDetail(order: Order) {
    setSelected(order);
    setDetailLoading(true);
    try {
      const res = await adminOrdersApi.get(order.id);
      setSelected(res.data);
    } catch {} finally { setDetailLoading(false); }
  }

  const paid    = items.filter((o) => o.status === "paid" || o.status === "delivered").length;
  const revenue = items
    .filter((o) => o.status === "paid" || o.status === "delivered")
    .reduce((sum, o) => sum + parseFloat(o.amount), 0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="eyebrow">Commandes ({total})</p>
        <button onClick={() => load(page)} disabled={loading}
          className="inline-flex items-center gap-2 border border-border px-3 py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
          <RefreshCw className={`size-3 ${loading ? "animate-spin" : ""}`} /> ACTUALISER
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="border border-border bg-card p-4">
          <p className="eyebrow text-[10px]">Total</p>
          <p className="mt-1 font-display text-2xl text-foreground">{total}</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="eyebrow text-[10px]">Payées / Livrées</p>
          <p className="mt-1 font-display text-2xl text-green-600">{paid}</p>
        </div>
        <div className="border border-border bg-card p-4">
          <p className="eyebrow text-[10px]">Revenus (page)</p>
          <p className="mt-1 font-display text-2xl text-foreground">{revenue.toFixed(2)} €</p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center"><Spinner /></div>
      ) : items.length === 0 ? (
        <div className="border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          Aucune commande pour le moment.
        </div>
      ) : (
        <>
          <div className="border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-card">
                <tr>
                  <th className="px-4 py-3 text-left eyebrow text-[10px]">#</th>
                  <th className="px-4 py-3 text-left eyebrow text-[10px]">Client</th>
                  <th className="hidden px-4 py-3 text-left eyebrow text-[10px] md:table-cell">Email</th>
                  <th className="px-4 py-3 text-right eyebrow text-[10px]">Montant</th>
                  <th className="px-4 py-3 text-center eyebrow text-[10px]">Statut</th>
                  <th className="hidden px-4 py-3 text-left eyebrow text-[10px] lg:table-cell">Date</th>
                  <th className="px-4 py-3 text-right eyebrow text-[10px]">Détail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((o) => (
                  <tr key={o.id} className="hover:bg-card transition-colors">
                    <td className="px-4 py-3 text-muted-foreground text-xs">#{o.id}</td>
                    <td className="px-4 py-3 font-medium text-foreground max-w-40 truncate">{o.full_name}</td>
                    <td className="hidden px-4 py-3 text-muted-foreground md:table-cell max-w-45 truncate">{o.email}</td>
                    <td className="px-4 py-3 text-right font-medium text-foreground tabular-nums">
                      {parseFloat(o.amount).toFixed(2)} {o.currency}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusDropdown order={o} onUpdated={updateItem} />
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground text-xs lg:table-cell">
                      {new Date(o.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => openDetail(o)}
                        className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" title="Voir le détail">
                        <ShoppingBag className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {lastPage > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Page {page} / {lastPage}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => load(page - 1)} disabled={page <= 1 || loading}
                  className="inline-flex items-center gap-1 border border-border px-3 py-2 font-display text-[10px] tracking-[0.14em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
                  <ChevronLeft className="size-3" /> PRÉC.
                </button>
                <button onClick={() => load(page + 1)} disabled={page >= lastPage || loading}
                  className="inline-flex items-center gap-1 border border-border px-3 py-2 font-display text-[10px] tracking-[0.14em] text-foreground hover:bg-card disabled:opacity-40 transition-colors">
                  SUIV. <ChevronRight className="size-3" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal détail (lecture seule) */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md border border-border bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <p className="font-display text-base text-foreground">COMMANDE #{selected.id}</p>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {detailLoading ? (
              <div className="flex h-40 items-center justify-center"><Spinner /></div>
            ) : (
              <div className="divide-y divide-border">
                <Row label="Nom"     value={selected.full_name} />
                <Row label="Email"   value={selected.email} />
                <Row label="Montant" value={`${parseFloat(selected.amount).toFixed(2)} ${selected.currency}`} />
                <Row label="Statut">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${STATUS_STYLES[selected.status]}`}>
                    {selected.status_label}
                  </span>
                </Row>
                <Row label="Réf. Mollie" value={selected.mollie_payment_id} mono />
                <Row label="Date" value={new Date(selected.created_at).toLocaleString("fr-FR")} />
                {selected.checkout_url && (
                  <div className="px-6 py-4 flex items-center justify-between">
                    <span className="eyebrow text-[10px] text-muted-foreground">Lien paiement</span>
                    <a href={selected.checkout_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-display text-[10px] tracking-[0.14em] text-accent hover:underline">
                      MOLLIE <ExternalLink className="size-3" />
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-border px-6 py-4">
              <button onClick={() => setSelected(null)}
                className="w-full border border-border py-2.5 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-card transition-colors">
                FERMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono, children }: {
  label: string; value?: string; mono?: boolean; children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3 gap-4">
      <span className="eyebrow text-[10px] text-muted-foreground shrink-0">{label}</span>
      {children ?? (
        <span className={`text-sm text-foreground text-right truncate ${mono ? "font-mono text-xs" : ""}`}>
          {value}
        </span>
      )}
    </div>
  );
}
