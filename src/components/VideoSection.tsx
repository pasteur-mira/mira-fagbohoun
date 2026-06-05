import { useState } from "react";
import { Play, Youtube } from "lucide-react";
import preachingImg from "@/assets/pastor-preaching1.jpeg";
import { Reveal } from "./Reveal";

// Remplacer par l'identifiant de la vidéo YouTube souhaitée (ex: "abc123XYZ")
const VIDEO_ID = "";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mb-14 text-center">
          <p className="eyebrow inline-block">Ministère en action</p>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
            LA PAROLE,{" "}
            <span className="text-primary">EN DIRECT.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
            Retrouvez les enseignements du Pasteur Mira Fagbohoun sur ICC TV Toulouse —
            une communauté de plus de 67 000 abonnés qui grandit chaque semaine.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-video overflow-hidden rounded-[1rem] bg-black shadow-[0_24px_80px_-16px_rgba(0,0,0,0.4)]">
            {!playing || !VIDEO_ID ? (
              <>
                <img
                  src={preachingImg}
                  alt="Regarder un enseignement"
                  className="h-full w-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {VIDEO_ID ? (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Lire la vidéo"
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_60px_-8px_rgba(248,211,42,0.9)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_80px_-8px_rgba(248,211,42,1)]">
                      <Play className="ml-1.5 size-10 fill-foreground text-foreground" />
                    </div>
                  </button>
                ) : (
                  <a
                    href="https://www.youtube.com/@ICCTVToulouse"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 group"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_60px_-8px_rgba(248,211,42,0.9)] transition-all duration-300 group-hover:scale-110">
                      <Play className="ml-1.5 size-10 fill-foreground text-foreground" />
                    </div>
                    <p className="font-display text-xs tracking-[0.22em] text-white/80">REGARDER SUR ICC TV TOULOUSE</p>
                  </a>
                )}
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="h-full w-full"
                title="Enseignement Pasteur Mira Fagbohoun"
              />
            )}
          </div>
        </Reveal>

        <Reveal delay={200} className="mt-8 flex justify-center">
          <a
            href="https://www.youtube.com/@ICCTVToulouse"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.22em] text-accent transition-colors hover:text-foreground"
          >
            <Youtube className="size-4" />
            TOUTES LES VIDÉOS SUR ICC TV TOULOUSE
          </a>
        </Reveal>
      </div>
    </section>
  );
}
