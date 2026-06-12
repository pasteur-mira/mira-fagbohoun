import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as agendaApi } from "./index-_lkiTHdm.mjs";
import { d as MapPin, A as ArrowUpRight, h as Calendar } from "../_libs/lucide-react.mjs";
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
const TYPE_LABELS = {
  culte: "Culte",
  conference: "Conférence",
  retraite: "Retraite",
  evenement: "Événement",
  reseau_icc: "Réseau ICC"
};
function Agenda() {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    agendaApi.list().then((res) => setEvents(res.data)).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "À venir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "CERTAINS MOMENTS",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "SE ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "VIVENT." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Cultes, conférences, retraites, événements spéciaux — retrouvez le Pasteur Mira Fagbohoun en personne. Certains moments se vivent, ils ne se regardent pas." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Impossible de charger l'agenda pour le moment." }) : events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Aucun événement prévu pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border border-y border-border", children: events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group grid gap-4 px-2 py-8 transition-colors hover:bg-card md:grid-cols-12 md:items-center md:gap-8 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-primary md:text-3xl", children: e.date_label }),
        e.time && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: e.time })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: TYPE_LABELS[e.type] ?? e.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-display text-xl text-foreground md:text-2xl", children: e.title.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
          " ",
          e.place
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-3 md:text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: "inline-flex items-center gap-2 font-display text-[11px] tracking-[0.22em] text-foreground group-hover:text-primary", children: [
        "EN SAVOIR PLUS ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
      ] }) })
    ] }, e.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/60 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-20 text-center md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "mx-auto size-8 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 font-serif-italic text-2xl text-foreground md:text-3xl", children: "« Inviter le Pasteur dans votre église ou événement ? »" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90", children: "CONTACTER LE PASTEUR" })
    ] }) })
  ] });
}
export {
  Agenda as component
};
