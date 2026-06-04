import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/pastor-hero.jpg";
import preachingImg from "@/assets/pastor-preaching.jpg";
import bookImg from "@/assets/book-teaser.jpg";
import { ArrowUpRight, Calendar, Play } from "lucide-react";
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
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Pasteur Mira Fagbohoun en prédication"
            width={1536}
            height={1920}
            className="h-full w-full object-cover object-[70%_center] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-32 md:pt-40">
          <p className="eyebrow">Pasteur associé · ICC Occitanie · Toulouse</p>
          <h1 className="mt-6 font-display text-5xl leading-[0.9] text-foreground sm:text-7xl md:text-[8.5rem]">
            UN HOMME.<br />
            UNE MISSION.<br />
            <span className="text-primary">UNE RÉGION À BÂTIR.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
            Pasteur Mira Fagbohoun · ICC Occitanie · Toulouse.
            Prédications · Agenda · Ressources · Booking.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/predications"
              className="inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              EXPLORER LE SITE
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-foreground/80 px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              ME CONTACTER
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-border/60 md:grid-cols-4">
          {[
            { k: "67K+", v: "Abonnés ICC TV Toulouse" },
            { k: "10+", v: "Années de ministère" },
            { k: "ICC", v: "Réseau Impact Centre Chrétien" },
            { k: "FR · INT.", v: "Région & international" },
          ].map((s) => (
            <div key={s.v} className="bg-card px-8 py-12">
              <p className="font-display text-4xl text-primary md:text-5xl">{s.k}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BIO TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <SectionHeader
              eyebrow="À propos"
              title={<>QUI EST LE PASTEUR<br/><span className="text-primary">MIRA FAGBOHOUN</span> ?</>}
              intro="Il n'est pas venu à Toulouse par hasard. Pasteur associé de l'église Impact Centre Chrétien Occitanie, il y déploie un ministère d'enseignement, de vision et d'édification — sous le leadership du Pasteur Yvan Castanou."
            />
            <blockquote className="mt-10 border-l-2 border-primary pl-6 font-serif-italic text-xl text-foreground md:text-2xl">
              « Un homme de foi pratique, ancré dans la région, tourné vers les nations. »
            </blockquote>
            <Link
              to="/a-propos"
              className="mt-10 inline-flex items-center gap-2 font-display text-xs tracking-[0.22em] text-primary"
            >
              LIRE LA BIOGRAPHIE COMPLÈTE <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <div className="md:col-span-5">
            <img
              src={preachingImg}
              alt="Pasteur Mira Fagbohoun en chaire"
              loading="lazy"
              width={1536}
              height={1024}
              className="aspect-[4/5] w-full object-cover grayscale"
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
              title={<>LA PAROLE<br/>QUI <span className="text-primary">BÂTIT</span>.</>}
            />
            <Link
              to="/predications"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 font-display text-[11px] tracking-[0.22em] text-foreground hover:border-primary hover:text-primary"
            >
              EXPLORER TOUTES LES RESSOURCES <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { t: "L'autorité spirituelle aujourd'hui", d: "Série · 3 messages", date: "Mars 2026" },
              { t: "La maturité qui transforme", d: "Enseignement", date: "Février 2026" },
              { t: "Foi pratique & discernement", d: "Culte ICC Toulouse", date: "Janvier 2026" },
            ].map((p) => (
              <article key={p.t} className="group relative aspect-[4/3] overflow-hidden border border-border bg-background">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <img src={preachingImg} alt="" loading="lazy" className="h-full w-full object-cover opacity-50 grayscale transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Play className="size-4 fill-current" />
                    <p className="font-display text-[10px] tracking-[0.22em]">{p.d.toUpperCase()}</p>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-tight text-foreground">{p.t.toUpperCase()}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{p.date}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK TEASER */}
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid items-center gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <img
              src={bookImg}
              alt="Livre à paraître du Pasteur Mira Fagbohoun"
              loading="lazy"
              width={1024}
              height={1536}
              className="mx-auto w-full max-w-md"
            />
          </div>
          <div className="md:col-span-7">
            <p className="eyebrow">Bientôt · Pré-commande ouverte</p>
            <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
              UN LIVRE<br/>
              <span className="text-primary">À VENIR.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour
              une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme.
              Réservez votre exemplaire dès maintenant.
            </p>
            <Link
              to="/livre"
              className="mt-10 inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90"
            >
              PRÉ-COMMANDER LE LIVRE <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AGENDA CTA */}
      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 py-20 md:flex-row md:items-center md:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow"><Calendar className="mr-2 inline size-3" /> Agenda</p>
            <h2 className="mt-4 font-display text-3xl leading-[0.95] text-foreground md:text-5xl">
              CERTAINS MOMENTS<br/>SE <span className="text-primary">VIVENT</span>.
            </h2>
          </div>
          <Link
            to="/agenda"
            className="inline-flex items-center gap-2 border border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background"
          >
            VOIR L'AGENDA COMPLET <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
  );
}
