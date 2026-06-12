import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Headphones, c as FileText, V as Video, B as BookOpen, A as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
const categories = [{
  icon: Headphones,
  t: "Séries de prédications",
  d: "Audio & vidéo",
  count: "12 séries",
  to: void 0
}, {
  icon: FileText,
  t: "Notes & études bibliques",
  d: "Téléchargements PDF",
  count: "24 ressources",
  to: void 0
}, {
  icon: Video,
  t: "Ressources pour leaders",
  d: "Formation Église locale",
  count: "8 modules",
  to: void 0
}, {
  icon: BookOpen,
  t: "Le livre — À venir",
  d: "Pré-commande ouverte",
  count: "Bientôt",
  to: "/livre"
}];
function Ressources() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Librairie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "DES OUTILS",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "POUR ALLER ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "PLUS LOIN." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Notes d'enseignement, séries thématiques, études bibliques. Des ressources pensées pour votre croissance personnelle et le renforcement de vos assemblées." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px border border-border bg-border md:grid-cols-2", children: categories.map((c) => {
      const Inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex h-full flex-col justify-between bg-card p-10 transition-colors hover:bg-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "size-8 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 font-display text-2xl text-foreground md:text-3xl", children: c.t.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: c.d })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-[11px] tracking-[0.22em] text-muted-foreground", children: c.count.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-5 text-foreground group-hover:text-primary" })
        ] })
      ] });
      return c.to ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: c.to, children: Inner }, c.t) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: Inner }, c.t);
    }) }) })
  ] });
}
export {
  Ressources as component
};
