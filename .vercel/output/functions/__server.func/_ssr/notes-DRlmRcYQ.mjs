import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { n as notesApi, f as formatSize } from "./index-_lkiTHdm.mjs";
import { B as BookOpen, D as Download } from "../_libs/lucide-react.mjs";
function Notes() {
  const [notes, setNotes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    notesApi.list().then((res) => setNotes(res.data)).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Ressources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "NOTES &",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "ÉTUDES BIBLIQUES." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-2xl text-base text-muted-foreground md:text-lg", children: "Supports de messages, études approfondies, notes de culte — des ressources conçues pour nourrir votre foi et approfondir votre connaissance de la Parole." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-sm text-muted-foreground", children: "Impossible de charger les ressources pour le moment." }) : notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-10 text-muted-foreground/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Aucune ressource disponible pour le moment." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: notes.map((note) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group flex flex-col border border-border bg-card overflow-hidden transition-colors hover:border-primary/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-30 w-full overflow-hidden bg-muted border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: `${note.file_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&page=1`, title: `Aperçu : ${note.title}`, loading: "lazy", scrolling: "no", className: "absolute top-0 left-0 border-0 pointer-events-none", style: {
          width: "calc(100% + 20px)",
          height: "calc(100% + 20px)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: note.file_url, target: "_blank", rel: "noreferrer", className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity", "aria-label": `Ouvrir ${note.title}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-white px-4 py-2 font-display text-[10px] tracking-[0.18em] text-white", children: "OUVRIR" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px] text-foreground", children: note.category.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow text-[9px] text-muted-foreground", children: note.date_label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base leading-tight text-accent", children: note.title.toUpperCase() }),
        note.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2", children: note.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatSize(note.file_size) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: note.file_url, download: note.file_name, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-display text-[10px] tracking-[0.18em] text-primary-foreground hover:opacity-90 transition-opacity", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3" }),
            " TÉLÉCHARGER"
          ] })
        ] })
      ] })
    ] }, note.id)) }) })
  ] });
}
export {
  Notes as component
};
