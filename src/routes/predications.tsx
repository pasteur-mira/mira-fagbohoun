import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Youtube } from "lucide-react";
import preachingImg from "@/assets/pastor-preaching1.jpeg";
import { predicationsApi, getYoutubeThumbnail, type Predication } from "@/lib/api";

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

function Predications() {
  const [sermons,  setSermons]  = useState<Predication[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  useEffect(() => {
    predicationsApi.list()
      .then((res) => setSermons(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="mx-auto max-w-350 px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Enseignements & Prédications</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
          LA PAROLE<br/><span className="text-primary">QUI BÂTIT.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Des messages ancrés dans la Parole, nourris par l'Esprit, pensés pour votre croissance.
          Foi, autorité spirituelle, maturité chrétienne — des thèmes portés avec conviction,
          sur les plateformes et dans les assemblées.
        </p>
        <a href="https://www.youtube.com/@ICCTVToulouse" target="_blank" rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 border border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background">
          <Youtube className="size-4" /> REGARDER SUR ICC TV TOULOUSE
        </a>
      </section>

      <section className="mx-auto max-w-350 px-6 pb-24 md:px-10 md:pb-36">
        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : error ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Impossible de charger les prédications pour le moment.
          </p>
        ) : sermons.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Aucune prédication disponible pour le moment.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {sermons.map((p) => {
              const thumbnail = p.thumbnail_url
                ?? (p.youtube_url ? getYoutubeThumbnail(p.youtube_url) : null)
                ?? preachingImg;
              const card = (
                <article className="group relative aspect-4/3 overflow-hidden border border-border bg-card">
                  <img src={thumbnail} alt="" loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex items-center gap-2 text-primary">
                      <Play className="size-4 fill-current" />
                      <p className="font-display text-[10px] tracking-[0.22em]">{p.category.toUpperCase()}</p>
                    </div>
                    <h3 className="mt-3 font-display text-xl leading-tight text-white">{p.title.toUpperCase()}</h3>
                    <p className="mt-2 text-xs text-white/60">{p.date_label}</p>
                  </div>
                </article>
              );

              return p.youtube_url ? (
                <a key={p.id} href={p.youtube_url} target="_blank" rel="noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={p.id}>{card}</div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
