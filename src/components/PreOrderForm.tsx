import { useState } from "react";
import { ShoppingCart, AlertCircle } from "lucide-react";
import { ordersApi } from "@/lib/api";

export function PreOrderForm() {
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const full_name = fd.get("full_name") as string;
    const email     = fd.get("email") as string;

    try {
      const res = await ordersApi.create({ full_name, email });
      window.location.href = res.checkout_url;
    } catch (err: any) {
      if (err?.errors) {
        const mapped: Record<string, string> = {};
        for (const [key, msgs] of Object.entries(err.errors as Record<string, string[]>)) {
          mapped[key] = msgs[0] ?? "";
        }
        setFieldErrors(mapped);
      } else {
        setGlobalError(err.message ?? "Une erreur est survenue. Veuillez réessayer.");
      }
      setLoading(false);
    }
  }

  const inputCls = "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {globalError && (
        <div className="flex items-start gap-3 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {globalError}
        </div>
      )}

      <div>
        <label htmlFor="full_name" className="eyebrow block">Nom complet *</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          autoComplete="name"
          className={`${inputCls} ${fieldErrors.full_name ? "border-destructive" : ""}`}
        />
        {fieldErrors.full_name && <p className="mt-1 text-xs text-destructive">{fieldErrors.full_name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="eyebrow block">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={`${inputCls} ${fieldErrors.email ? "border-destructive" : ""}`}
        />
        {fieldErrors.email && <p className="mt-1 text-xs text-destructive">{fieldErrors.email}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <ShoppingCart className="size-4" />
        {loading ? "REDIRECTION..." : "COMMANDER · 25 €"}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        Paiement sécurisé par Mollie · Visa, Mastercard, iDEAL, Bancontact
      </p>
    </form>
  );
}
