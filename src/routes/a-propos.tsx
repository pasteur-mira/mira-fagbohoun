import { createFileRoute, Link } from "@tanstack/react-router";
import bibleImg from "@/assets/pastor-bible.jpg";
import { SectionHeader } from "@/components/SectionHeader";

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

function APropos() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Biographie</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-8xl">
          QUI EST LE PASTEUR<br/>
          <span className="text-primary">MIRA FAGBOHOUN</span> ?
        </h1>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <img src={bibleImg} alt="Pasteur Mira Fagbohoun" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="md:col-span-7 space-y-8 text-base leading-relaxed text-muted-foreground md:text-lg">
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
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-border/60 md:grid-cols-3">
          {[
            { k: "ICC", v: "Impact Centre Chrétien · Réseau" },
            { k: "OCCITANIE", v: "Pasteur associé · Toulouse" },
            { k: "FINANCES", v: "Ministère de la gestion" },
          ].map((s) => (
            <div key={s.k} className="bg-card px-8 py-14">
              <p className="font-display text-2xl text-primary md:text-3xl">{s.k}</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-24 text-center md:px-10 md:py-36">
        <SectionHeader
          align="center"
          eyebrow="Vision"
          title={<>UNE RÉGION.<br/><span className="text-primary">UNE GÉNÉRATION.</span></>}
          intro="Affermir les croyants, équiper les leaders, planter une foi qui dure — la vision du ministère s'incarne sur le terrain, semaine après semaine."
        />
        <Link to="/contact" className="mt-12 inline-flex items-center gap-2 bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90">
          INVITER LE PASTEUR MIRA
        </Link>
      </section>
    </>
  );
}