import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route } from "./router-CnONMYcp.mjs";
import "../_libs/sonner.mjs";
import { w as CircleCheckBig, C as Clock, a as Mail, x as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function PaymentSuccess() {
  const {
    order
  } = Route.useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen flex-col items-center justify-center bg-background px-6 py-24 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-10 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: "Commande reçue" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-foreground md:text-4xl", children: "MERCI POUR VOTRE COMMANDE !" }),
    order && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-muted-foreground", children: [
      "Référence commande : ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
        "#",
        order
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-start gap-3 border border-border bg-card p-5 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-0.5 size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Vérification du paiement en cours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Votre paiement est en cours de traitement par Mollie. La confirmation vous sera envoyée par email dans quelques instants." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-start gap-3 border border-border bg-card p-5 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-0.5 size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Email de confirmation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Un email récapitulatif vous sera envoyé une fois le paiement validé. Vérifiez également vos courriers indésirables." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 transition-opacity", children: [
      "RETOUR À L'ACCUEIL ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
    ] })
  ] }) });
}
export {
  PaymentSuccess as component
};
