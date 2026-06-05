import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/pastor-hero.jpg";
import preachingImg from "@/assets/pastor-preaching.jpg";
import bookImg from "@/assets/book-teaser.jpg";
import { ArrowUpRight, Calendar, Play, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pasteur Mira Fagbohoun · Un homme. Une mission. Une région à bâtir." },
      { name: "description", content: "Pasteur Mira Fagbohoun · ICC Occitanie · Toulouse. Prédications, Agenda, Ressources, Booking." },
      { property: "og:title", content: "Pasteur Mira Fagbohoun · ICC Occitanie" },
      { property: "og:description", content: "Un homme. Une mission. Une région à bâtir." },
    ],
  }),
  component: Index,
});

function Index() {
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
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {/* Decorative color blobs */}
        <div aria-hidden className="absolute -left-32 top-24 -z-10 size-[420px] rounded-full bg-primary/40 blur-3xl blob-pulse" />
        <div aria-hidden className="absolute -right-24 top-1/3 -z-10 size-[360px] rounded-full bg-accent/30 blur-3xl blob-pulse" style={{ animationDelay: "-3s" }} />

        <div className="mx-auto grid min-h-[92vh] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-12 md:gap-12 md:px-10 md:pb-24 md:pt-32">
          <div className="md:col-span-7 fade-up">
            <p className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="size-3" /> Pasteur associé · ICC Occitanie · Toulouse
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[0.92] text-foreground sm:text-7xl md:text-[7.5rem]">
              UN HOMME.<br />
              UNE MISSION.<br />
              UNE RÉGION{" "}
              <span className="highlight-circle">À BÂTIR.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
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
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground px-7 py-4 font-display text-xs tracking-[0.22em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                INVITER LE PASTEUR
              </Link>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-accent via-primary to-accent/60 blur-2xl opacity-70" />
            <div className="relative overflow-hidden rounded-[1.25rem] border-4 border-foreground shadow-[12px_12px_0_0_var(--color-foreground)]">
              <img
                src={heroImg}
                alt="Pasteur Mira Fagbohoun en prédication"
                width={1536}
                height={1920}
                className="aspect-[4/5] w-full object-cover object-[60%_center]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y-2 border-foreground bg-foreground py-5 text-background">
        <div className="marquee-track whitespace-nowrap font-display text-2xl tracking-[0.1em] md:text-4xl">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="mx-8 inline-flex items-center gap-8">
              {m}
              <span className="inline-block size-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* BIO TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <SectionHeader
              eyebrow="À propos"
              title={<>QUI EST LE PASTEUR<br/><span className="highlight-underline">MIRA FAGBOHOUN</span> ?</>}
              intro="Il n'est pas venu à Toulouse par hasard. Pasteur associé de l'église Impact Centre Chrétien Occitanie, il y déploie un ministère d'enseignement, de vision et d'édification — sous le leadership du Pasteur Yvan Castanou."
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
          </div>
          <div className="relative md:col-span-5">
            <div aria-hidden className="absolute -right-3 -top-3 -z-10 h-full w-full rounded-[1rem] bg-primary" />
            <img
              src={preachingImg}
              alt="Pasteur Mira Fagbohoun en chaire"
              loading="lazy"
              width={1536}
              height={1024}
              className="aspect-[4/5] w-full rounded-[1rem] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PRÉDICATIONS */}
      <section className="bg-card">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
          <div className="flex flex-wrap items-end justify-between gap-8">
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
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { t: "L'autorité spirituelle aujourd'hui", d: "Série · 3 messages", date: "Mars 2026", tint: "bg-primary" },
              { t: "La maturité qui transforme", d: "Enseignement", date: "Février 2026", tint: "bg-accent" },
              { t: "Foi pratique & discernement", d: "Culte ICC Toulouse", date: "Janvier 2026", tint: "bg-foreground" },
            ].map((p, i) => (
              <article key={p.t} className="group relative aspect-[4/3] overflow-hidden rounded-[1rem] border-2 border-foreground bg-background transition-transform hover:-translate-y-1">
                <div className={`absolute inset-0 ${p.tint} mix-blend-multiply opacity-80`} />
                <img src={preachingImg} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-primary">
                    <Play className="size-4 fill-current" />
                    <p className="font-display text-[10px] tracking-[0.22em]">{p.d.toUpperCase()}</p>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-tight">{p.t.toUpperCase()}</h3>
                  <p className="mt-2 text-xs opacity-80">{p.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK TEASER */}
      <section className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-20">
          <div className="relative md:col-span-5">
            <div aria-hidden className="absolute inset-10 -z-10 rounded-full bg-primary blur-2xl opacity-70 blob-pulse" />
            <img
              src={bookImg}
              alt="Livre à paraître du Pasteur Mira Fagbohoun"
              loading="lazy"
              width={1024}
              height={1536}
              className="float-y mx-auto w-full max-w-md drop-shadow-2xl"
            />
          </div>
          <div className="md:col-span-7">
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
          </div>
        </div>
      </section>

      {/* AGENDA CTA */}
      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 py-20 md:flex-row md:items-center md:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary"><Calendar className="mr-2 inline size-3" /> Agenda</p>
            <h2 className="mt-4 font-display text-3xl leading-[0.95] md:text-5xl">
              CERTAINS MOMENTS<br/>SE <span className="highlight-circle">VIVENT</span>.
            </h2>
          </div>
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            VOIR L'AGENDA COMPLET <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
