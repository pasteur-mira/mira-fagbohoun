import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import bookImg from "@/assets/livre.jpeg";
import { PreOrderForm } from "@/components/PreOrderForm";
import { Check, X, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/livre")({
  head: () => ({
    meta: [
      { title: "Le Livre · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Commandez le premier livre du Pasteur Mira Fagbohoun. Foi, autorité, maturité — un manifeste." },
      { property: "og:title", content: "Le Livre · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Un livre. Une parole qui dure." },
    ],
  }),
  component: Livre,
});

function Livre() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 pb-20 pt-32 md:grid-cols-12 md:gap-20 md:px-10 md:pb-28 md:pt-44">
          <div className="md:col-span-6">
            <p className="eyebrow">Disponible · Commander maintenant</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
              UN LIVRE.<br/>
              <span className="text-primary">UNE PAROLE</span><br/>
              QUI DURE.
            </h1>
            <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
              Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour
              une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-foreground">
              {[
                "25 € · Paiement unique et sécurisé",
                "Livraison dès la sortie officielle",
                "Paiement via Mollie (Visa, Mastercard, iDEAL…)",
                "Confirmation de commande par email",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setOpen(true)}
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(248,211,42,0.9)]"
            >
              <ShoppingCart className="size-4" /> COMMANDER · 25 €
            </button>
          </div>
          <div className="md:col-span-6">
            <img src={bookImg} alt="Mockup du livre à paraître" loading="lazy" className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </section>

      {/* Modale commande */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="eyebrow text-[10px]">Commander</p>
                <p className="font-display text-lg text-foreground">VOTRE EXEMPLAIRE</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Fermer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Prix */}
            <div className="border-b border-border bg-card px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Livre — Pasteur Mira Fagbohoun</p>
                <p className="font-display text-xl text-foreground">25 €</p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="px-6 py-6">
              <PreOrderForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
