import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { agendaApi, type AgendaEvent } from "@/lib/api";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Cultes, conférences, retraites et événements spéciaux — retrouvez le Pasteur Mira Fagbohoun en personne." },
      { property: "og:title", content: "Agenda · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Certains moments se vivent, ils ne se regardent pas." },
    ],
  }),
  component: Agenda,
});

const TYPE_LABELS: Record<string, string> = {
  culte:       "Culte",
  conference:  "Conférence",
  retraite:    "Retraite",
  evenement:   "Événement",
  reseau_icc:  "Réseau ICC",
};

function Agenda() {
  const [events,  setEvents]  = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    agendaApi.list()
      .then((res) => setEvents(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">À venir</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
          CERTAINS MOMENTS<br/>SE <span className="text-primary">VIVENT.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Cultes, conférences, retraites, événements spéciaux — retrouvez le Pasteur
          Mira Fagbohoun en personne. Certains moments se vivent, ils ne se regardent pas.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Impossible de charger l'agenda pour le moment.
          </p>
        ) : events.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucun événement prévu pour le moment.
          </p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {events.map((e) => (
              <li key={e.id} className="group grid gap-4 px-2 py-8 transition-colors hover:bg-card md:grid-cols-12 md:items-center md:gap-8 md:px-6">
                <div className="md:col-span-3">
                  <p className="font-display text-2xl text-primary md:text-3xl">{e.date_label}</p>
                  {e.time && <p className="mt-1 text-xs text-muted-foreground">{e.time}</p>}
                </div>
                <div className="md:col-span-6">
                  <p className="eyebrow">{TYPE_LABELS[e.type] ?? e.type}</p>
                  <h3 className="mt-2 font-display text-xl text-foreground md:text-2xl">{e.title.toUpperCase()}</h3>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" /> {e.place}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <Link to="/contact" className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.22em] text-foreground group-hover:text-primary">
                    EN SAVOIR PLUS <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-20 text-center md:px-10">
          <Calendar className="mx-auto size-8 text-primary" />
          <p className="mt-6 font-serif-italic text-2xl text-foreground md:text-3xl">
            « Inviter le Pasteur dans votre église ou événement ? »
          </p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90">
            CONTACTER LE PASTEUR
          </Link>
        </div>
      </section>
    </>
  );
}
