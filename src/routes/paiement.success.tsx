import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Clock, ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/paiement/success")({
  validateSearch: (search: Record<string, unknown>) => ({
    order: search.order ? Number(search.order) : undefined,
  }),
  head: () => ({
    meta: [{ title: "Commande confirmée · Pasteur Mira Fagbohoun" }],
  }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const { order } = Route.useSearch();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center">
      <div className="w-full max-w-md">

        {/* Icône */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle className="size-10 text-primary" />
        </div>

        {/* Titre */}
        <p className="eyebrow mb-3">Commande reçue</p>
        <h1 className="font-display text-3xl text-foreground md:text-4xl">
          MERCI POUR VOTRE COMMANDE !
        </h1>

        {order && (
          <p className="mt-3 text-sm text-muted-foreground">
            Référence commande : <span className="font-medium text-foreground">#{order}</span>
          </p>
        )}

        {/* Statut en attente */}
        <div className="mt-8 flex items-start gap-3 border border-border bg-card p-5 text-left">
          <Clock className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Vérification du paiement en cours</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Votre paiement est en cours de traitement par Mollie.
              La confirmation vous sera envoyée par email dans quelques instants.
            </p>
          </div>
        </div>

        {/* Info email */}
        <div className="mt-4 flex items-start gap-3 border border-border bg-card p-5 text-left">
          <Mail className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">Email de confirmation</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Un email récapitulatif vous sera envoyé une fois le paiement validé.
              Vérifiez également vos courriers indésirables.
            </p>
          </div>
        </div>

        {/* Retour accueil */}
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 transition-opacity"
        >
          RETOUR À L'ACCUEIL <ArrowRight className="size-4" />
        </Link>

      </div>
    </div>
  );
}
