import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { p as preachingImg } from "./pastor-preaching1-BlHZaa2F.mjs";
import { b as bookImg } from "./livre-DUy_Fkdz.mjs";
import { R as Reveal, S as SectionHeader } from "./Reveal-CRDOnlKr.mjs";
import { p as predicationsApi, t as bannersApi, g as getYoutubeThumbnail } from "./index-_lkiTHdm.mjs";
import { A as ArrowUpRight, P as Play, h as Calendar, Y as Youtube } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const banniere1 = "/assets/banniere1-D0wot2UM.jpeg";
const banniere2 = "/assets/banniere2-DDb0FhOk.jpeg";
const banniere3 = "/assets/banniere3-BpeM8ce_.jpeg";
function VideoSection() {
  const [playing, setPlaying] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "mb-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow inline-block", children: "Ministère en action" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl", children: [
        "LA PAROLE,",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "EN DIRECT." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-base text-muted-foreground", children: "Retrouvez les enseignements du Pasteur Mira Fagbohoun sur ICC TV Toulouse — une communauté de plus de 67 000 abonnés qui grandit chaque semaine." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 120, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video overflow-hidden rounded-[1rem] bg-black shadow-[0_24px_80px_-16px_rgba(0,0,0,0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: preachingImg,
          alt: "Regarder un enseignement",
          className: "h-full w-full object-cover opacity-60"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "https://www.youtube.com/@ICCTVToulouse",
          target: "_blank",
          rel: "noreferrer",
          className: "absolute inset-0 flex flex-col items-center justify-center gap-4 group",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-primary shadow-[0_0_60px_-8px_rgba(248,211,42,0.9)] transition-all duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "ml-1.5 size-10 fill-foreground text-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs tracking-[0.22em] text-white/80", children: "REGARDER SUR ICC TV TOULOUSE" })
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 200, className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "https://www.youtube.com/@ICCTVToulouse",
        target: "_blank",
        rel: "noreferrer",
        className: "inline-flex items-center gap-2 font-display text-[11px] tracking-[0.22em] text-accent transition-colors hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "size-4" }),
          "TOUTES LES VIDÉOS SUR ICC TV TOULOUSE"
        ]
      }
    ) })
  ] }) });
}
function Index() {
  const [sermons, setSermons] = reactExports.useState([]);
  reactExports.useEffect(() => {
    predicationsApi.list().then((res) => setSermons(res.data.slice(0, 3))).catch(() => {
    });
  }, []);
  const marquee = ["Foi pratique", "Autorité spirituelle", "Maturité", "Église locale", "ICC Occitanie", "Toulouse", "Région à bâtir", "Génération debout"];
  const FALLBACK_SLIDES = [banniere1, banniere2, banniere3];
  const [banners, setBanners] = reactExports.useState([]);
  reactExports.useEffect(() => {
    bannersApi.list().then((res) => setBanners(res.data)).catch(() => {
    });
  }, []);
  const slides = banners.length > 0 ? banners.map((b) => b.image_url) : FALLBACK_SLIDES;
  const [active, setActive] = reactExports.useState(0);
  reactExports.useEffect(() => {
    setActive(0);
  }, [slides.length]);
  reactExports.useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), 5e3);
    return () => clearInterval(t);
  }, [slides.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate min-h-[92vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "absolute inset-0 -z-20", children: [
        slides.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: `absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-out ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-105"}`, style: {
          transitionProperty: "opacity, transform"
        } }, src)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -right-24 top-1/4 -z-10 size-[420px] rounded-full bg-primary/30 blur-3xl blob-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-[92vh] max-w-[1400px] flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow inline-flex items-center gap-2 text-white/80 font-medium", children: "PASTEUR ASSOCIÉ DES EGLISES ICC - PASTEUR PRINCIPAL EGLISES ICC OCCITANIE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-3xl leading-[0.92] text-white sm:text-5xl md:text-6xl font-semibold", children: [
            "UN HOMME. UNE MISSION.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "UNE RÉGION",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-circle", children: "À BÂTIR." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-xl text-base text-white/80 md:text-lg ", children: "Prédicateur, enseignant, bâtisseur d'Église. De Toulouse vers la région — et au-delà. Découvrez la vision, les enseignements, et le livre à paraître." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/livre", className: "group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(248,211,42,0.9)]", children: [
              "PRÉ-COMMANDER LE LIVRE",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-4 font-display text-xs tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-foreground", children: "INVITER LE PASTEUR" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex items-center gap-3", children: slides.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": `Slide ${i + 1}`, onClick: () => setActive(i), className: `h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-primary" : "w-5 bg-white/40 hover:bg-white/70"}` }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "overflow-hidden border-y-2 border-foreground bg-foreground py-5 text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-track whitespace-nowrap font-display text-1xl tracking-[0.1em] md:text-2xl font-semibold", children: [...marquee, ...marquee].map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mx-8 inline-flex items-center gap-8", children: [
      m,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block size-2 rounded-full bg-primary" })
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 md:grid-cols-12 md:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "md:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "À propos", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "QUI EST LE PASTEUR",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-underline", children: "MIRA FAGBOHOUN" }),
          " ?"
        ] }), intro: "Il n'est pas venu à Toulouse par hasard. Pasteur associé des églises ICC et Pasteur principal des églises ICC occitanie, il y déploie un ministère d'enseignement, de vision et d'édification — sous le leadership du Pasteur Yvan Castanou." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-10 border-l-4 border-primary pl-6 font-serif-italic text-xl text-foreground md:text-2xl", children: "« Un homme de foi pratique, ancré dans la région, tourné vers les nations. »" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/a-propos", className: "mt-10 inline-flex items-center gap-2 font-display text-xs tracking-[0.22em] text-accent hover:text-foreground", children: [
          "LIRE LA BIOGRAPHIE COMPLÈTE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 150, className: "relative md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -right-3 -top-3 -z-10 h-full w-full rounded-[1rem] bg-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preachingImg, alt: "Pasteur Mira Fagbohoun en chaire", loading: "lazy", width: 1536, height: 1024, className: "aspect-[4/5] w-full rounded-[1rem] object-cover" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "flex flex-wrap items-end justify-between gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { eyebrow: "Enseignements", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "LA PAROLE",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "QUI ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-circle", children: "BÂTIT" }),
          "."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/predications", className: "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-3 font-display text-[11px] tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background", children: [
          "EXPLORER TOUTES LES RESSOURCES ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-3", children: sermons.length === 0 ? Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-4/3 rounded-3xl border-2 border-foreground bg-muted animate-pulse" }) }, i)) : sermons.map((p, i) => {
        const thumbnail = p.thumbnail_url ?? (p.youtube_url ? getYoutubeThumbnail(p.youtube_url) : null) ?? preachingImg;
        const card = /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative aspect-4/3 overflow-hidden rounded-3xl border-2 border-foreground bg-background transition-transform hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail, alt: "", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4 fill-current" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[10px] tracking-[0.22em]", children: p.category.toUpperCase() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl leading-tight", children: p.title.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs opacity-80", children: p.date_label })
          ] })
        ] });
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: p.youtube_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.youtube_url, target: "_blank", rel: "noreferrer", children: card }) : card }, p.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-16 md:grid-cols-12 md:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "relative md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute inset-10 -z-10 rounded-full bg-primary blur-2xl opacity-70 blob-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bookImg, alt: "Livre à paraître du Pasteur Mira Fagbohoun", loading: "lazy", width: 1024, height: 1536, className: "float-y mx-auto w-full max-w-md drop-shadow-2xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 150, className: "md:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 animate-pulse rounded-full bg-accent" }),
          " Bientôt · Pré-commande ouverte"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl", children: [
          "UN LIVRE",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-circle", children: "À VENIR." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-base text-muted-foreground md:text-lg", children: "Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme. Réservez votre exemplaire dès maintenant." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/livre", className: "mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-transform hover:-translate-y-0.5", children: [
          "PRÉ-COMMANDER LE LIVRE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-foreground text-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 px-6 py-20 md:flex-row md:items-center md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mr-2 inline size-3" }),
          " Agenda"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-3xl leading-[0.95] md:text-5xl", children: [
          "CERTAINS MOMENTS",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "SE ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight-circle", children: "VIVENT" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/agenda", className: "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-transform hover:-translate-y-0.5", children: [
        "VOIR L'AGENDA COMPLET ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
      ] }) })
    ] }) })
  ] });
}
export {
  Index as component
};
