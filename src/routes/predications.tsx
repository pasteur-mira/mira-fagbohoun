import { createFileRoute } from "@tanstack/react-router";
import preachingImg from "@/assets/pastor-preaching1.jpeg";
import { Play, Youtube } from "lucide-react";

export const Route = createFileRoute("/predications")({
  head: () => ({
    meta: [
      { title: "Prédications & Enseignements · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Retrouvez les enseignements, prédications et messages du Pasteur Mira Fagbohoun — foi, autorité spirituelle, maturité chrétienne." },
      { property: "og:title", content: "Prédications · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "La Parole qui bâtit. Enseignements & prédications." },
    ],
  }),
  component: Predications,
});

const sermons = [
  { t: "L'autorité spirituelle aujourd'hui", s: "Série · 3 messages", d: "Mars 2026" },
  { t: "La maturité qui transforme", s: "Enseignement", d: "Février 2026" },
  { t: "Foi pratique & discernement", s: "Culte ICC Toulouse", d: "Janvier 2026" },
  { t: "Bâtir sur le roc", s: "Conférence régionale", d: "Décembre 2025" },
  { t: "La transmission générationnelle", s: "Enseignement", d: "Novembre 2025" },
  { t: "Finances & royaume", s: "Série · 5 messages", d: "Octobre 2025" },
];

function Predications() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Enseignements & Prédications</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
          LA PAROLE<br/><span className="text-primary">QUI BÂTIT.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Des messages ancrés dans la Parole, nourris par l'Esprit, pensés pour votre croissance.
          Foi, autorité spirituelle, maturité chrétienne — des thèmes portés avec conviction,
          sur les plateformes et dans les assemblées.
        </p>
        <a href="https://www.youtube.com/@ICCTVToulouse" target="_blank" rel="noreferrer" className="mt-10 inline-flex items-center gap-3 border border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background">
          <Youtube className="size-4" /> REGARDER SUR ICC TV TOULOUSE
        </a>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-6 md:grid-cols-3">
          {sermons.map((p) => (
            <article key={p.t} className="group relative aspect-[4/3] overflow-hidden border border-border bg-card">
              <img src={preachingImg} alt="" loading="lazy" className="h-full w-full object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-primary">
                  <Play className="size-4 fill-current" />
                  <p className="font-display text-[10px] tracking-[0.22em]">{p.s.toUpperCase()}</p>
                </div>
                <h3 className="mt-3 font-display text-xl leading-tight text-foreground">{p.t.toUpperCase()}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}