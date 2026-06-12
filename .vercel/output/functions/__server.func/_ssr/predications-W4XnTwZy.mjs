import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as preachingImg } from "./pastor-preaching1-BlHZaa2F.mjs";
import { p as predicationsApi, g as getYoutubeThumbnail } from "./index-_lkiTHdm.mjs";
import { Y as Youtube, P as Play } from "../_libs/lucide-react.mjs";
function Predications() {
  const [sermons, setSermons] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    predicationsApi.list().then((res) => setSermons(res.data)).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-350 px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Enseignements & Prédications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "LA PAROLE",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "QUI BÂTIT." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Des messages ancrés dans la Parole, nourris par l'Esprit, pensés pour votre croissance. Foi, autorité spirituelle, maturité chrétienne — des thèmes portés avec conviction, sur les plateformes et dans les assemblées." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.youtube.com/@ICCTVToulouse", target: "_blank", rel: "noreferrer", className: "mt-10 inline-flex items-center gap-3 rounded-full border border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "size-4" }),
        " REGARDER SUR ICC TV TOULOUSE"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-350 px-6 pb-24 md:px-10 md:pb-36", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Impossible de charger les prédications pour le moment." }) : sermons.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Aucune prédication disponible pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: sermons.map((p) => {
      const thumbnail = p.thumbnail_url ?? (p.youtube_url ? getYoutubeThumbnail(p.youtube_url) : null) ?? preachingImg;
      const card = /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group relative aspect-4/3 overflow-hidden border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thumbnail, alt: "", loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4 fill-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[10px] tracking-[0.22em]", children: p.category.toUpperCase() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-xl leading-tight text-white", children: p.title.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-white/60", children: p.date_label })
        ] })
      ] });
      return p.youtube_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.youtube_url, target: "_blank", rel: "noreferrer", className: "block", children: card }, p.id) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: card }, p.id);
    }) }) })
  ] });
}
export {
  Predications as component
};
