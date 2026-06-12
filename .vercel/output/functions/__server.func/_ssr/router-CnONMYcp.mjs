import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { X, M as Menu, Y as Youtube, I as Instagram, F as Facebook, a as Mail, S as Sun, b as Moon } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-D9O6R4d6.css";
function reportError(error, context = {}) {
  if (typeof window === "undefined") return;
  console.error("[Error]", error, context);
}
const logoBlack = "/assets/logo-black-NYxdUG7p.png";
const logoBlanc = "/assets/logo-blanc-Ds-otsfK.png";
function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useTheme() {
  const [theme, setTheme] = reactExports.useState(getInitialTheme);
  reactExports.useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return {
    theme,
    toggle: () => setTheme((t) => t === "dark" ? "light" : "dark")
  };
}
function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre",
      className,
      children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" })
    }
  );
}
const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/predications", label: "Prédications" },
  { to: "/notes", label: "Notes" },
  { to: "/agenda", label: "Agenda" },
  { to: "/programme", label: "Programme" },
  { to: "/livre", label: "Le Livre" },
  { to: "/contact", label: "Contact" }
];
function SiteNav() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const headerBg = isHome ? scrolled ? "border-b border-white/10 bg-black/60 backdrop-blur-md" : "border-b border-white/10 bg-transparent" : "border-b border-border bg-background/95 backdrop-blur-md";
  const linkClass = isHome ? "font-sans font-medium text-[11px] tracking-[0.12em] text-white/80 transition-colors hover:text-white" : "font-sans font-medium text-[11px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground";
  const linkActiveClass = isHome ? "text-white" : "text-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: `fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerBg}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "aria-label": "Accueil", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: isHome ? logoBlanc : logoBlack,
          alt: "Pasteur Mira Fagbohoun",
          className: "h-14 w-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-9 lg:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: linkClass,
          activeProps: { className: linkActiveClass },
          children: l.label.toUpperCase()
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-3 lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { className: `transition-colors ${isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            className: "rounded-full bg-primary px-6 py-3 font-display text-[11px] tracking-[0.2em] text-primary-foreground shadow-[0_6px_24px_-8px_rgba(248,211,42,0.7)] transition-transform hover:-translate-y-0.5",
            children: "INVITER LE PASTEUR"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Menu",
          onClick: () => setOpen((v) => !v),
          className: `transition-colors lg:hidden ${isHome ? "text-white" : "text-foreground"}`,
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `border-t lg:hidden ${isHome ? "border-white/10 bg-black/80 backdrop-blur-md" : "border-border/60 bg-background"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col px-6 py-6", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          onClick: () => setOpen(false),
          className: `border-b py-4 font-sans font-medium text-xs tracking-[0.12em] ${isHome ? "border-white/10 text-white/70" : "border-border/40 text-muted-foreground"}`,
          activeProps: { className: isHome ? "text-white" : "text-foreground" },
          children: l.label.toUpperCase()
        },
        l.to
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            onClick: () => setOpen(false),
            className: "rounded-full bg-primary px-5 py-4 text-center font-display text-xs tracking-[0.2em] text-primary-foreground",
            children: "INVITER LE PASTEUR"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { className: `flex items-center justify-center gap-2 border py-3 font-display text-[10px] tracking-[0.18em] transition-colors
                ${isHome ? "border-white/20 text-white/70" : "border-border text-muted-foreground"}` })
      ] })
    ] }) })
  ] });
}
function TikTok({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.02-.07z" }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/60 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-20 md:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "  PASTEUR DES EGLISES ICC - PASTEUR PRINCIPAL EGLISES ICC OCCITANIE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-3xl leading-[0.95] text-foreground md:text-4xl font-semibold", children: "MIRA FAGBOHOUN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-md text-sm text-muted-foreground", children: "Un homme. Une mission. Une région à bâtir." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Naviguer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/a-propos", className: "text-foreground hover:text-primary", children: "À propos" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/predications", className: "text-foreground hover:text-primary", children: "Prédications" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/agenda", className: "text-foreground hover:text-primary", children: "Agenda" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/ressources", className: "text-foreground hover:text-primary", children: "Ressources" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/livre", className: "text-foreground hover:text-primary", children: "Le Livre" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Suivre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.youtube.com/@MiraFAGBOHOUNTV", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "size-4" }),
            " @MiraFAGBOHOUNTV"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.youtube.com/@ICCTVToulouse", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, { className: "size-4" }),
            " ICC TV Toulouse"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.instagram.com/mirafagbohoun", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "size-4" }),
            " @mirafagbohoun"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.facebook.com/mirafagbohoun", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "size-4" }),
            " mirafagbohoun"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.tiktok.com/@mirafagbohoun", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TikTok, { className: "size-4" }),
            " @mirafagbohoun"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:mirafagbohoun@gmail.com", className: "inline-flex items-center gap-3 text-foreground hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
            " mirafagbohoun@gmail.com"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Pasteur Mira Fagbohoun · Tous droits réservés."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display tracking-[0.2em]", children: "ICC OCCITANIE · TOULOUSE" })
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function SplashScreen() {
  const [leaving, setLeaving] = reactExports.useState(false);
  const [gone, setGone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setLeaving(true), 2e3);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("splash_shown", "1");
    }, 2750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (gone) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": true,
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground",
      style: {
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoBlanc,
            alt: "",
            className: "h-16 w-auto md:h-20",
            style: {
              opacity: leaving ? 0 : 1,
              transform: leaving ? "translateY(-8px)" : "translateY(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 h-px w-32 overflow-hidden bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-primary", style: { animation: "splash-bar 1.8s ease-out 0.1s forwards", transform: "scaleX(0)", transformOrigin: "left" } }) })
      ]
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page introuvable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Cette page n'existe pas ou a été déplacée." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Retour à l'accueil"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportError(error, { boundary: "root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Une erreur est survenue" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Quelque chose s'est mal passé. Vous pouvez actualiser la page ou revenir à l'accueil." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Réessayer"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Accueil"
        }
      )
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pasteur Mira Fagbohoun · ICC Occitanie · Toulouse" },
      { name: "description", content: "Site officiel du Pasteur Mira Fagbohoun — Pasteur associé ICC Occitanie. Prédications, agenda et ressources." },
      { name: "author", content: "Mira Fagbohoun" },
      { property: "og:title", content: "Pasteur Mira Fagbohoun · ICC Occitanie" },
      { property: "og:description", content: "Un homme. Une mission. Une région à bâtir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:creator", content: "@MiraFagbohoun" }
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
const themeScript = `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}})();`;
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: themeScript } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });
  const isAdmin = location.pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SplashScreen, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-background text-foreground", children: [
      !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      !isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] });
}
const BASE_URL = "";
const Route$b = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/a-propos", "/predications", "/agenda", "/ressources", "/livre", "/contact"];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      }
    }
  }
});
const $$splitComponentImporter$a = () => import("./ressources-BJ7DFANl.mjs");
const Route$a = createFileRoute("/ressources")({
  head: () => ({
    meta: [{
      title: "Ressources & Librairie · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Notes d'enseignement, séries thématiques, études bibliques — des ressources pensées pour votre croissance."
    }, {
      property: "og:title",
      content: "Ressources · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Des outils pour aller plus loin."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./programme-CYxv_14c.mjs");
const Route$9 = createFileRoute("/programme")({
  head: () => ({
    meta: [{
      title: "Programme Hebdomadaire · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Retrouvez chaque semaine les cultes, réunions de prière et événements réguliers des églises ICC Occitanie."
    }, {
      property: "og:title",
      content: "Programme Hebdomadaire · ICC Occitanie"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./predications-W4XnTwZy.mjs");
const Route$8 = createFileRoute("/predications")({
  head: () => ({
    meta: [{
      title: "Prédications & Enseignements · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Retrouvez les enseignements, prédications et messages du Pasteur Mira Fagbohoun — foi, autorité spirituelle, maturité chrétienne."
    }, {
      property: "og:title",
      content: "Prédications · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "La Parole qui bâtit. Enseignements & prédications."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./notes-DRlmRcYQ.mjs");
const Route$7 = createFileRoute("/notes")({
  head: () => ({
    meta: [{
      title: "Notes & Études Bibliques · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Téléchargez les notes d'études bibliques et supports de messages du Pasteur Mira Fagbohoun."
    }, {
      property: "og:title",
      content: "Notes & Études Bibliques · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Des ressources pour approfondir votre foi."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./livre-BenrqzCB.mjs");
const Route$6 = createFileRoute("/livre")({
  head: () => ({
    meta: [{
      title: "Le Livre · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Commandez le premier livre du Pasteur Mira Fagbohoun. Foi, autorité, maturité — un manifeste."
    }, {
      property: "og:title",
      content: "Le Livre · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Un livre. Une parole qui dure."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-Bz5qyrJK.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Contacter le Pasteur Mira Fagbohoun — email et réseaux sociaux."
    }, {
      property: "og:title",
      content: "Contact · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Contacter le Pasteur Mira Fagbohoun."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./agenda-CKJOk0dw.mjs");
const Route$4 = createFileRoute("/agenda")({
  head: () => ({
    meta: [{
      title: "Agenda · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Cultes, conférences, retraites et événements spéciaux — retrouvez le Pasteur Mira Fagbohoun en personne."
    }, {
      property: "og:title",
      content: "Agenda · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Certains moments se vivent, ils ne se regardent pas."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-D9Cy5ahp.mjs");
const Route$3 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Administration · Pasteur Mira Fagbohoun"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./a-propos-CEkAjNRD.mjs");
const Route$2 = createFileRoute("/a-propos")({
  head: () => ({
    meta: [{
      title: "À propos · Pasteur Mira Fagbohoun"
    }, {
      name: "description",
      content: "Parcours, appel et vision du Pasteur Mira Fagbohoun, pasteur associé ICC Occitanie à Toulouse."
    }, {
      property: "og:title",
      content: "À propos · Pasteur Mira Fagbohoun"
    }, {
      property: "og:description",
      content: "Pasteur associé ICC Occitanie · Toulouse · Vision pour la région."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BaiYlfGR.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Pasteur Mira Fagbohoun · Un homme. Une mission. Une région à bâtir."
    }, {
      name: "description",
      content: "Pasteur Mira Fagbohoun · ICC Occitanie · Toulouse. Prédications, Agenda et Ressources."
    }, {
      property: "og:title",
      content: "Pasteur Mira Fagbohoun · ICC Occitanie"
    }, {
      property: "og:description",
      content: "Un homme. Une mission. Une région à bâtir."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./paiement.success-C3IZ-uWt.mjs");
const Route = createFileRoute("/paiement/success")({
  validateSearch: (search) => ({
    order: search.order ? Number(search.order) : void 0
  }),
  head: () => ({
    meta: [{
      title: "Commande confirmée · Pasteur Mira Fagbohoun"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$b.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$c
});
const RessourcesRoute = Route$a.update({
  id: "/ressources",
  path: "/ressources",
  getParentRoute: () => Route$c
});
const ProgrammeRoute = Route$9.update({
  id: "/programme",
  path: "/programme",
  getParentRoute: () => Route$c
});
const PredicationsRoute = Route$8.update({
  id: "/predications",
  path: "/predications",
  getParentRoute: () => Route$c
});
const NotesRoute = Route$7.update({
  id: "/notes",
  path: "/notes",
  getParentRoute: () => Route$c
});
const LivreRoute = Route$6.update({
  id: "/livre",
  path: "/livre",
  getParentRoute: () => Route$c
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$c
});
const AgendaRoute = Route$4.update({
  id: "/agenda",
  path: "/agenda",
  getParentRoute: () => Route$c
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$c
});
const AProposRoute = Route$2.update({
  id: "/a-propos",
  path: "/a-propos",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const PaiementSuccessRoute = Route.update({
  id: "/paiement/success",
  path: "/paiement/success",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  AProposRoute,
  AdminRoute,
  AgendaRoute,
  ContactRoute,
  LivreRoute,
  NotesRoute,
  PredicationsRoute,
  ProgrammeRoute,
  RessourcesRoute,
  SitemapDotxmlRoute,
  PaiementSuccessRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r
};
