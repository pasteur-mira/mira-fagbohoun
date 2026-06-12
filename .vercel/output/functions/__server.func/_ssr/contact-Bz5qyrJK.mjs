import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as contactApi } from "./index-_lkiTHdm.mjs";
import { a as Mail, Y as Youtube, I as Instagram, F as Facebook } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function TikTok({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.02-.07z" }) });
}
const socials = [{
  icon: Mail,
  label: "mirafagbohoun@gmail.com",
  href: "mailto:mirafagbohoun@gmail.com",
  desc: "Email"
}, {
  icon: Youtube,
  label: "@MiraFAGBOHOUNTV",
  href: "https://www.youtube.com/@MiraFAGBOHOUNTV",
  desc: "YouTube"
}, {
  icon: Youtube,
  label: "ICC TV Toulouse",
  href: "https://www.youtube.com/@ICCTVToulouse",
  desc: "YouTube"
}, {
  icon: Instagram,
  label: "@mirafagbohoun",
  href: "https://www.instagram.com/mirafagbohoun",
  desc: "Instagram"
}, {
  icon: Facebook,
  label: "mirafagbohoun",
  href: "https://www.facebook.com/mirafagbohoun",
  desc: "Facebook"
}, {
  icon: TikTok,
  label: "@mirafagbohoun",
  href: "https://www.tiktok.com/@mirafagbohoun",
  desc: "TikTok"
}];
function Contact() {
  const [loading, setLoading] = reactExports.useState(false);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await contactApi.send({
        full_name: fd.get("name"),
        email: fd.get("email"),
        message: fd.get("message")
      });
      toast.success("Message envoyé. L'équipe vous répondra rapidement.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error(err.message ?? "Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full overflow-x-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Prendre contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-4xl leading-[0.9] text-foreground md:text-6xl font-semibold", children: [
        "RESTONS EN",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "CONTACT." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-sm text-muted-foreground md:text-lg", children: "Pour inviter le Pasteur Mira Fagbohoun ou pour toute demande, écrivez directement via le formulaire ou par email." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "w-full overflow-x-hidden px-6 pb-24 md:px-10 md:pb-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 md:col-span-5 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-2", children: "Retrouvez-nous sur" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-6", children: socials.map(({
          icon: Icon,
          label,
          href,
          desc
        }) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, target: href.startsWith("mailto") ? void 0 : "_blank", rel: href.startsWith("mailto") ? void 0 : "noreferrer", className: "inline-flex items-center gap-4 text-foreground hover:text-primary transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-6 shrink-0 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-0.5 text-[10px]", children: desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium md:text-base", children: label })
          ] })
        ] }) }, href)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 md:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border bg-card p-4 md:p-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-6", children: "Formulaire de contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block", children: "Nom complet *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "name", type: "text", required: true, className: "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block", children: "Email *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name: "email", type: "email", required: true, className: "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "eyebrow block", children: "Message *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", rows: 6, required: true, className: "mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: loading, className: "w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 disabled:opacity-50", children: loading ? "ENVOI..." : "ENVOYER LE MESSAGE" }) })
        ] })
      ] }) })
    ] }) }) })
  ] });
}
export {
  Contact as component
};
