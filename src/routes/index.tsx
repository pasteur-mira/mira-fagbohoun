import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import banniere1 from "@/assets/banniere1.jpeg";
import banniere2 from "@/assets/banniere2.jpeg";
import banniere3 from "@/assets/banniere3.jpeg";
import preachingImg from "@/assets/pastor-preaching2.jpeg";
import bookImg from "@/assets/livre.jpeg";
import { ArrowUpRight, Calendar, Play } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { VideoSection } from "@/components/VideoSection";
import { predicationsApi, bannersApi, getYoutubeThumbnail, type Predication, type Banner } from "@/lib/api";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pasteur Mira Fagbohoun · Un homme. Une mission. Une région à bâtir." },
      { name: "description", content: "Pasteur Mira Fagbohoun · ICC Occitanie · Toulouse. Prédications, Agenda et Ressources." },
      { property: "og:title", content: "Pasteur Mira Fagbohoun · ICC Occitanie" },
      { property: "og:description", content: "Un homme. Une mission. Une région à bâtir." },
    ],
  }),
  component: Index,
});

function Index() {
  const [sermons, setSermons] = useState<Predication[]>([]);
  useEffect(() => {
    predicationsApi.list()
      .then((res) => setSermons(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  const marquee = [
    "Foi pratique",
    "Autorité spirituelle",
    "Maturité",
    "Église locale",
    "ICC Occitanie",
    "Toulouse",
    "Région à bâtir",
    "Génération debout",
  ];
  const FALLBACK_SLIDES = [banniere1, banniere2, banniere3];
  const [banners, setBanners] = useState<Banner[]>([]);
  useEffect(() => {
    bannersApi.list().then((res) => setBanners(res.data)).catch(() => {});
  }, []);
  const slides = banners.length > 0 ? banners.map((b) => b.image_url) : FALLBACK_SLIDES;

  const [active, setActive] = useState(0);
  useEffect(() => {
    setActive(0);
  }, [slides.length]);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        {/* Background carousel */}
        <div aria-hidden className="absolute inset-0 -z-20">
          {slides.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-out ${
                i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            />
          ))}
          {/* Dark gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* Decorative blob accent */}
        <div aria-hidden className="absolute -right-24 top-1/4 -z-10 size-[420px] rounded-full bg-primary/30 blur-3xl blob-pulse" />

        <div className="mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
          <div className="max-w-4xl fade-up">
            <p className="eyebrow inline-flex items-center gap-2 text-white/80 font-medium">
               PASTEUR ASSOCIÉ DES EGLISES ICC - PASTEUR PRINCIPAL EGLISES ICC OCCITANIE
            </p>
            <h1 className="mt-6 font-display text-3xl leading-[0.92] text-white sm:text-5xl md:text-6xl font-semibold">
              UN HOMME.
              UNE MISSION.<br />
              UNE RÉGION{" "}
              <span className="highlight-circle">À BÂTIR.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base text-white/80 md:text-lg ">
              Prédicateur, enseignant, bâtisseur d'Église. De Toulouse vers la région —
              et au-delà. Découvrez la vision, les enseignements, et le livre à paraître.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/livre"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(248,211,42,0.9)]"
              >
                PRÉ-COMMANDER LE LIVRE
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-4 font-display text-xs tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-foreground"
              >
                INVITER LE PASTEUR
              </Link>
            </div>
          </div>

          {/* Carousel dots */}
          <div className="mt-12 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-10 bg-primary" : "w-5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y-2 border-foreground bg-foreground py-5 text-background">
        <div className="marquee-track whitespace-nowrap font-display text-1xl tracking-[0.1em] md:text-2xl font-semibold">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8">
              {m}
              <span className="inline-block size-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      {/* <StatsSection /> */}

      {/* BIO TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="md:col-span-7">
            <SectionHeader
              eyebrow="À propos"
              title={<>QUI EST LE PASTEUR<br/><span className="highlight-underline">MIRA FAGBOHOUN</span> ?</>}
              intro="Il n'est pas venu à Toulouse par hasard. Pasteur associé des églises ICC et Pasteur principal des églises ICC occitanie, il y déploie un ministère d'enseignement, de vision et d'édification — sous le leadership du Pasteur Yvan Castanou."
            />
            <blockquote className="mt-10 border-l-4 border-primary pl-6 font-serif-italic text-xl text-foreground md:text-2xl">
              « Un homme de foi pratique, ancré dans la région, tourné vers les nations. »
            </blockquote>
            <Link
              to="/a-propos"
              className="mt-10 inline-flex items-center gap-2 font-display text-xs tracking-[0.22em] text-accent hover:text-foreground"
            >
              LIRE LA BIOGRAPHIE COMPLÈTE <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={150} className="relative md:col-span-5">
            <div aria-hidden className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[1rem] bg-primary" />
            <img
              src={preachingImg}
              alt="Pasteur Mira Fagbohoun en chaire"
              loading="lazy"
              width={1536}
              height={1024}
              className="aspect-[4/5] w-full rounded-[1rem] object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* PRÉDICATIONS */}
      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              eyebrow="Enseignements"
              title={<>LA PAROLE<br/>QUI <span className="highlight-circle">BÂTIT</span>.</>}
            />
            <Link
              to="/predications"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-3 font-display text-[11px] tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background"
            >
              EXPLORER TOUTES LES RESSOURCES <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {sermons.length === 0
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="aspect-4/3 rounded-3xl border-2 border-foreground bg-muted animate-pulse" />
                  </Reveal>
                ))
              : sermons.map((p, i) => {
                  const thumbnail = p.thumbnail_url
                    ?? (p.youtube_url ? getYoutubeThumbnail(p.youtube_url) : null)
                    ?? preachingImg;
                  const card = (
                    <article className="group relative aspect-4/3 overflow-hidden rounded-3xl border-2 border-foreground bg-background transition-transform hover:-translate-y-1">
                      <img src={thumbnail} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <div className="flex items-center gap-2 text-primary">
                          <Play className="size-4 fill-current" />
                          <p className="font-display text-[10px] tracking-[0.22em]">{p.category.toUpperCase()}</p>
                        </div>
                        <h3 className="mt-3 font-display text-xl leading-tight">{p.title.toUpperCase()}</h3>
                        <p className="mt-2 text-xs opacity-80">{p.date_label}</p>
                      </div>
                    </article>
                  );
                  return (
                    <Reveal key={p.id} delay={i * 100}>
                      {p.youtube_url
                        ? <a href={p.youtube_url} target="_blank" rel="noreferrer">{card}</a>
                        : card}
                    </Reveal>
                  );
                })
            }
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <VideoSection />

      {/* TESTIMONIALS */}
      {/* <TestimonialsSection /> */}

      {/* BOOK TEASER */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="relative md:col-span-5">
            <div aria-hidden className="absolute inset-10 -z-10 rounded-full bg-primary blur-2xl opacity-70 blob-pulse" />
            <img
              src={bookImg}
              alt="Livre à paraître du Pasteur Mira Fagbohoun"
              loading="lazy"
              width={1024}
              height={1536}
              className="float-y mx-auto w-full max-w-md drop-shadow-2xl"
            />
          </Reveal>
          <Reveal delay={150} className="md:col-span-7">
            <p className="eyebrow inline-flex items-center gap-2"><span className="size-2 animate-pulse rounded-full bg-accent" /> Bientôt · Pré-commande ouverte</p>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
              UN LIVRE<br/>
              <span className="highlight-circle">À VENIR.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour
              une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme.
              Réservez votre exemplaire dès maintenant.
            </p>
            <Link
              to="/livre"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-transform hover:-translate-y-0.5"
            >
              PRÉ-COMMANDER LE LIVRE <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* AGENDA CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 py-20 md:flex-row md:items-center md:px-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-primary"><Calendar className="mr-2 inline size-3" /> Agenda</p>
            <h2 className="mt-4 font-display text-3xl leading-[0.95] md:text-5xl">
              CERTAINS MOMENTS<br/>SE <span className="highlight-circle">VIVENT</span>.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <Link
              to="/agenda"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              VOIR L'AGENDA COMPLET <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
