import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/predications", label: "Prédications" },
  { to: "/agenda", label: "Agenda" },
  { to: "/ressources", label: "Ressources" },
  { to: "/livre", label: "Le Livre" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-display text-sm tracking-[0.24em] text-foreground">
          MIRA<span className="text-primary">.</span>FAGBOHOUN
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-[11px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
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
          className="text-foreground lg:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background lg:hidden">
          <nav className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-4 font-display text-xs tracking-[0.2em] text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
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