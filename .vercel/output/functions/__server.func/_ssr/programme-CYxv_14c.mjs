import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as recurringEventsApi } from "./index-_lkiTHdm.mjs";
import { C as Clock, d as MapPin, A as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
  priere: "Prière",
  conference: "Conférence",
  jeune: "Jeûne",
  evenement: "Événement"
};
const TYPE_COLORS = {
  culte: "border-primary/40 bg-primary/10 text-primary",
  priere: "border-accent/40 bg-accent/10 text-accent",
  conference: "border-purple-500/40 bg-purple-500/10 text-purple-600",
  jeune: "border-orange-500/40 bg-orange-500/10 text-orange-600",
  evenement: "border-border bg-muted text-muted-foreground"
};
function Programme() {
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    recurringEventsApi.list().then((res) => setEvents(res.data)).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Chaque semaine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-4xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "PROGRAMME ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "HEBDOMADAIRE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Retrouvez chaque semaine les cultes, réunions de prière et rencontres régulières des églises ICC Occitanie. Tous sont les bienvenus." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Impossible de charger le programme pour le moment." }) : events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Aucun événement régulier pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: events.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-6 transition-colors hover:bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full border px-2 py-0.5 font-display text-[10px] tracking-[0.12em] ${TYPE_COLORS[r.type] ?? TYPE_COLORS.evenement}`, children: TYPE_LABELS[r.type] ?? r.type }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-xl leading-tight text-foreground", children: r.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-medium text-primary text-sm", children: r.day_label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5 shrink-0" }),
          r.times_label,
          r.time_end ? ` → ${r.time_end}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5 shrink-0" }),
          r.place
        ] }),
        r.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pl-5 text-xs text-muted-foreground/70", children: r.address })
      ] })
    ] }, r.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/60 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-20 text-center md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif-italic text-2xl text-foreground md:text-3xl", children: "« Venez vivre l'expérience en personne. »" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90", children: "NOUS CONTACTER" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/agenda", className: "inline-flex items-center gap-2 rounded-full border-2 border-foreground px-6 py-4 font-display text-xs tracking-[0.22em] text-foreground hover:bg-foreground hover:text-background transition-colors", children: [
          "VOIR L'AGENDA ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Programme as component
};
