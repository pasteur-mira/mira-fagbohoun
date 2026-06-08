import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoBlack from "@/assets/logo-black.png";
import logoBlanc from "@/assets/logo-blanc.png";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/predications", label: "Prédications" },
  { to: "/notes", label: "Notes" },
  { to: "/agenda", label: "Agenda" },
  { to: "/livre", label: "Le Livre" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sur les autres pages : fond blanc fixe, texte sombre
  // Sur l'accueil : transparent en haut, noir semi-transparent au scroll
  const headerBg = isHome
    ? scrolled
      ? "border-b border-white/10 bg-black/60 backdrop-blur-md"
      : "border-b border-white/10 bg-transparent"
    : "border-b border-border bg-background/95 backdrop-blur-md";

  const linkClass = isHome
    ? "font-sans font-medium text-[11px] tracking-[0.12em] text-white/80 transition-colors hover:text-white"
    : "font-sans font-medium text-[11px] tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground";

  const linkActiveClass = isHome ? "text-white" : "text-foreground";

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" aria-label="Accueil">
          <img
            src={isHome ? logoBlanc : logoBlack}
            alt="Pasteur Mira Fagbohoun"
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: linkActiveClass }}
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-primary px-6 py-3 font-display text-[11px] tracking-[0.2em] text-primary-foreground shadow-[0_6px_24px_-8px_rgba(248,211,42,0.7)] transition-transform hover:-translate-y-0.5 lg:inline-block"
        >
          INVITER LE PASTEUR
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className={`transition-colors lg:hidden ${isHome ? "text-white" : "text-foreground"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className={`border-t lg:hidden ${isHome ? "border-white/10 bg-black/80 backdrop-blur-md" : "border-border/60 bg-background"}`}>
          <nav className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`border-b py-4 font-sans font-medium text-xs tracking-[0.12em] ${
                  isHome ? "border-white/10 text-white/70" : "border-border/40 text-muted-foreground"
                }`}
                activeProps={{ className: isHome ? "text-white" : "text-foreground" }}
              >
                {l.label.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-primary px-5 py-4 text-center font-display text-xs tracking-[0.2em] text-primary-foreground"
            >
              INVITER LE PASTEUR
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
