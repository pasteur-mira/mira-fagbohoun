import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { recurringEventsApi, type RecurringEvent } from "@/lib/api";

export const Route = createFileRoute("/programme")({
  head: () => ({
    meta: [
      { title: "Programme Hebdomadaire · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Retrouvez chaque semaine les cultes, réunions de prière et événements réguliers des églises ICC Occitanie." },
      { property: "og:title", content: "Programme Hebdomadaire · ICC Occitanie" },
    ],
  }),
  component: Programme,
});

const TYPE_LABELS: Record<string, string> = {
  culte:      "Culte",
  priere:     "Prière",
  conference: "Conférence",
  jeune:      "Jeûne",
  evenement:  "Événement",
};

const TYPE_COLORS: Record<string, string> = {
  culte:      "border-primary/40 bg-primary/10 text-primary",
  priere:     "border-accent/40 bg-accent/10 text-accent",
  conference: "border-purple-500/40 bg-purple-500/10 text-purple-600",
  jeune:      "border-orange-500/40 bg-orange-500/10 text-orange-600",
  evenement:  "border-border bg-muted text-muted-foreground",
};

function Programme() {
  const [events,  setEvents]  = useState<RecurringEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    recurringEventsApi.list()
      .then((res) => setEvents(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Chaque semaine</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
          PROGRAMME <span className="text-primary">HEBDOMADAIRE</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Retrouvez chaque semaine les cultes, réunions de prière et rencontres régulières
          des églises ICC Occitanie. Tous sont les bienvenus.
        </p>
      </section>

      {/* Liste */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Impossible de charger le programme pour le moment.
          </p>
        ) : events.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucun événement régulier pour le moment.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((r) => (
              <div key={r.id} className="border border-border bg-card p-6 transition-colors hover:bg-background">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${TYPE_COLORS[r.type] ?? TYPE_COLORS.evenement}`}>
                  {TYPE_LABELS[r.type] ?? r.type}
                </span>

                <h2 className="mt-4 font-display text-xl leading-tight text-foreground">
                  {r.title.toUpperCase()}
                </h2>

                <p className="mt-2 font-medium text-primary text-sm">{r.day_label}</p>

                <div className="mt-4 space-y-2">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-3.5 shrink-0" />
                    {r.times_label}{r.time_end ? ` → ${r.time_end}` : ""}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0" />
                    {r.place}
                  </p>
                  {r.address && (
                    <p className="pl-5 text-xs text-muted-foreground/70">{r.address}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-20 text-center md:px-10">
          <p className="font-serif-italic text-2xl text-foreground md:text-3xl">
            « Venez vivre l'expérience en personne. »
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90">
              NOUS CONTACTER
            </Link>
            <Link to="/agenda" className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background transition-colors">
              VOIR L'AGENDA <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
