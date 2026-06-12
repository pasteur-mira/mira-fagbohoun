import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as bookImg } from "./livre-DUy_Fkdz.mjs";
import { o as ordersApi } from "./index-_lkiTHdm.mjs";
import { e as Check, f as ShoppingCart, X, g as CircleAlert } from "../_libs/lucide-react.mjs";
function PreOrderForm() {
  const [loading, setLoading] = reactExports.useState(false);
  const [fieldErrors, setFieldErrors] = reactExports.useState({});
  const [globalError, setGlobalError] = reactExports.useState("");
  async function onSubmit(e) {
    e.preventDefault();
    setFieldErrors({});
    setGlobalError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const full_name = fd.get("full_name");
    const email = fd.get("email");
    try {
      const res = await ordersApi.create({ full_name, email });
      window.location.href = res.checkout_url;
    } catch (err) {
      if (err?.errors) {
        const mapped = {};
        for (const [key, msgs] of Object.entries(err.errors)) {
          mapped[key] = msgs[0] ?? "";
        }
        setFieldErrors(mapped);
      } else {
        setGlobalError(err.message ?? "Une erreur est survenue. Veuillez réessayer.");
      }
      setLoading(false);
    }
  }
  const inputCls = "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-5", children: [
    globalError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 size-4 shrink-0" }),
      globalError
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "full_name", className: "eyebrow block", children: "Nom complet *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "full_name",
          name: "full_name",
          type: "text",
          required: true,
          autoComplete: "name",
          className: `${inputCls} ${fieldErrors.full_name ? "border-destructive" : ""}`
        }
      ),
      fieldErrors.full_name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: fieldErrors.full_name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "eyebrow block", children: "Email *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "email",
          name: "email",
          type: "email",
          required: true,
          autoComplete: "email",
          className: `${inputCls} ${fieldErrors.email ? "border-destructive" : ""}`
        }
      ),
      fieldErrors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-destructive", children: fieldErrors.email })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "submit",
        disabled: loading,
        className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-4" }),
          loading ? "REDIRECTION..." : "COMMANDER · 25 €"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Paiement sécurisé par Mollie · Visa, Mastercard, iDEAL, Bancontact" })
  ] });
}
function Livre() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border/60 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-[1400px] items-center gap-16 px-6 pb-20 pt-32 md:grid-cols-12 md:gap-20 md:px-10 md:pb-28 md:pt-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Disponible · Commander maintenant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-5xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
          "UN LIVRE.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "UNE PAROLE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "QUI DURE."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-xl text-base text-muted-foreground md:text-lg", children: "Le Pasteur Mira Fagbohoun publie son premier livre — un manifeste pour une foi qui s'enseigne, une autorité qui se transmet, une maturité qui transforme." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-3 text-sm text-foreground", children: ["25 € · Paiement unique et sécurisé", "Livraison dès la sortie officielle", "Paiement via Mollie (Visa, Mastercard, iDEAL…)", "Confirmation de commande par email"].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 size-4 shrink-0 text-primary" }),
          " ",
          i
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(true), className: "mt-10 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground shadow-[0_8px_30px_-8px_rgba(248,211,42,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-10px_rgba(248,211,42,0.9)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "size-4" }),
          " COMMANDER · 25 €"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bookImg, alt: "Mockup du livre à paraître", loading: "lazy", className: "mx-auto w-full max-w-md" }) })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow text-[10px]", children: "Commander" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground", children: "VOTRE EXEMPLAIRE" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "text-muted-foreground transition-colors hover:text-foreground", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Livre — Pasteur Mira Fagbohoun" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl text-foreground", children: "25 €" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreOrderForm, {}) })
      ] })
    ] })
  ] });
}
export {
  Livre as component
};
