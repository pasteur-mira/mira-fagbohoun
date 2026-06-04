import { createFileRoute } from "@tanstack/react-router";
import bookImg from "@/assets/book-teaser.jpg";
import { PreOrderForm } from "@/components/PreOrderForm";
import { Check } from "lucide-react";

export const Route = createFileRoute("/livre")({
  head: () => ({
    meta: [
      { title: "Le Livre · Pré-commande · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Pré-commandez le premier livre du Pasteur Mira Fagbohoun. Foi, autorité, maturité — un manifeste à venir." },
      { property: "og:title", content: "Le Livre · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Un livre à venir. Pré-commande ouverte." },
    ],
  }),
  component: Livre,
});

function Livre() {
  return (
    <>
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 pb-20 pt-32 md:grid-cols-12 md:gap-20 md:px-10 md:pb-28 md:pt-44">
          <div className="md:col-span-6">
            <p className="eyebrow">Bientôt · Pré-commande</p>
            <h1 className="mt-6 font-display text-5xl leading-[0.9] text-foreground md:text-8xl">
              UN LIVRE.<br/>
              <span className="text-primary">UNE PAROLE</span><br/>
              QUI DURE.
            </h1>
            <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
              Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour
              une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme.
              Réservez votre exemplaire maintenant et recevez une notification dès la sortie.
            </p>
            <ul className="mt-10 space-y-3 text-sm text-foreground">
              {[
                "Pré-commande sans engagement de paiement",
                "Notification prioritaire à la sortie",
                "Tarif lancement réservé aux pré-inscrits",
                "Possibilité de commander plusieurs exemplaires (Église, groupe)",
              ].map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6">
            <img src={bookImg} alt="Mockup du livre à paraître" loading="lazy" className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="eyebrow">Pré-commander</p>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
              RÉSERVEZ<br/>VOTRE <span className="text-primary">EXEMPLAIRE.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground">
              Renseignez vos coordonnées — vous serez recontacté dès la mise en vente officielle.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="border border-border bg-card p-8 md:p-12">
              <PreOrderForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}