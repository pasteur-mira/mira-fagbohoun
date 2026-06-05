import { createFileRoute, Link } from "@tanstack/react-router";
import bibleImg from "@/assets/pastor-biographie.jpg";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Parcours, appel et vision du Pasteur Mira Fagbohoun, pasteur associé ICC Occitanie à Toulouse." },
      { property: "og:title", content: "À propos · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Pasteur associé ICC Occitanie · Toulouse · Vision pour la région." },
    ],
  }),
  component: APropos,
});

const timeline = [
  { year: "2016", title: "L'appel", desc: "Réponse à l'appel pastoral à Toulouse — une vie consacrée à l'Église locale et à la région." },
  { year: "2018", title: "ICC Occitanie", desc: "Intègre l'église Impact Centre Chrétien sous la direction du Pasteur Yvan Castanou." },
  { year: "2020", title: "ICC TV Toulouse", desc: "Lancement des enseignements en ligne — la chaîne dépasse rapidement les 30 000 abonnés." },
  { year: "2023", title: "Nations", desc: "Premières interventions internationales en Belgique, Côte d'Ivoire et au Sénégal." },
  { year: "2025", title: "Pasteur associé", desc: "Nommé officiellement pasteur associé d'ICC Occitanie, en charge de la formation et de l'enseignement." },
  { year: "2026", title: "Le Livre", desc: "Publication du premier livre — un manifeste pour une foi ancrée et une Église mature." },
];

function APropos() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <Reveal>
          <p className="eyebrow">Biographie</p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold">
            QUI EST LE PASTEUR<br/>
            <span className="text-primary">MIRA FAGBOHOUN</span> ?
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <Reveal className="md:col-span-5">
            <img src={bibleImg} alt="Pasteur Mira Fagbohoun" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 space-y-8 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p className="font-serif-italic text-2xl leading-snug text-foreground md:text-3xl">
              « Il n'est pas venu à Toulouse par hasard. »
            </p>
            <p>
              Pasteur associé de l'église <strong className="text-foreground">Impact Centre Chrétien Occitanie</strong>,
              le Pasteur Mira Fagbohoun y déploie un ministère d'enseignement, de vision et d'édification —
              sous le leadership du Pasteur Yvan Castanou.
            </p>
            <p>
              Un homme de foi pratique, ancré dans la région, tourné vers les nations.
              Son ministère porte une parole claire sur l'autorité spirituelle, la maturité chrétienne
              et la gestion des finances — un ancrage concret et un discernement pratique
              au service de l'Église locale.
            </p>
            <p>
              À travers ICC TV Toulouse (67 000 abonnés) et un agenda d'événements régionaux,
              nationaux et internationaux, il bâtit une génération debout pour la région Occitanie.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <Reveal className="mb-16">
          <p className="eyebrow">Parcours</p>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl">
            UNE TRAJECTOIRE<br/>
            <span className="text-primary">TRACÉE.</span>
          </h2>
        </Reveal>

        <div className="relative">
          {/* Vertical line */}
          <div aria-hidden className="absolute left-18 top-0 h-full w-px bg-border md:left-1/2" />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 80}>
                <div className={`relative flex gap-8 pb-12 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <p className="font-display text-4xl text-primary md:text-5xl">{item.year}</p>
                    <h3 className="mt-2 font-display text-xl text-foreground">{item.title.toUpperCase()}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-16 top-2 flex h-4 w-4 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  </div>

                  {/* Empty half on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-8 text-center md:px-10 md:pb-36 md:pt-12">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Vision"
            title={<>UNE RÉGION.<br/><span className="text-primary">UNE GÉNÉRATION.</span></>}
            intro="Affermir les croyants, équiper les leaders, planter une foi qui dure — la vision du ministère s'incarne sur le terrain, semaine après semaine."
            titleClassName="font-semibold"
          />
          <Link to="/contact" className="mt-12 inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90">
            INVITER LE PASTEUR MIRA
          </Link>
        </Reveal>
      </section>
    </>
  );
}
