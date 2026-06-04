import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Headphones, Video, BookOpen, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Ressources & Librairie · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Notes d'enseignement, séries thématiques, études bibliques — des ressources pensées pour votre croissance." },
      { property: "og:title", content: "Ressources · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Des outils pour aller plus loin." },
    ],
  }),
  component: Ressources,
});

const categories = [
  { icon: Headphones, t: "Séries de prédications", d: "Audio & vidéo", count: "12 séries", to: undefined },
  { icon: FileText, t: "Notes & études bibliques", d: "Téléchargements PDF", count: "24 ressources", to: undefined },
  { icon: Video, t: "Ressources pour leaders", d: "Formation Église locale", count: "8 modules", to: undefined },
  { icon: BookOpen, t: "Le livre — À venir", d: "Pré-commande ouverte", count: "Bientôt", to: "/livre" as const },
];

function Ressources() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Librairie</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-8xl">
          DES OUTILS<br/>POUR ALLER <span className="text-primary">PLUS LOIN.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Notes d'enseignement, séries thématiques, études bibliques. Des ressources pensées
          pour votre croissance personnelle et le renforcement de vos assemblées.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {categories.map((c) => {
            const Inner = (
              <div className="group flex h-full flex-col justify-between bg-card p-10 transition-colors hover:bg-background">
                <div>
                  <c.icon className="size-8 text-primary" />
                  <h3 className="mt-8 font-display text-2xl text-foreground md:text-3xl">{c.t.toUpperCase()}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
                </div>
                <div className="mt-12 flex items-center justify-between">
                  <p className="font-display text-[11px] tracking-[0.22em] text-muted-foreground">{c.count.toUpperCase()}</p>
                  <ArrowUpRight className="size-5 text-foreground group-hover:text-primary" />
                </div>
              </div>
            );
            return c.to ? (
              <Link key={c.t} to={c.to}>{Inner}</Link>
            ) : (
              <div key={c.t}>{Inner}</div>
            );
          })}
        </div>
      </section>
    </>
  );
}