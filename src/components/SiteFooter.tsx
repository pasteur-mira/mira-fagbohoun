import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, Facebook } from "lucide-react";

function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Pasteur associé · ICC Occitanie</p>
            <h3 className="mt-4 font-display text-3xl leading-[0.95] text-foreground md:text-4xl font-semibold">
              MIRA FAGBOHOUN
            </h3>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              Un homme. Une mission. Une région à bâtir.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Naviguer</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/a-propos" className="text-foreground hover:text-primary">À propos</Link></li>
              <li><Link to="/predications" className="text-foreground hover:text-primary">Prédications</Link></li>
              <li><Link to="/agenda" className="text-foreground hover:text-primary">Agenda</Link></li>
              <li><Link to="/ressources" className="text-foreground hover:text-primary">Ressources</Link></li>
              <li><Link to="/livre" className="text-foreground hover:text-primary">Le Livre</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow">Suivre</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="https://www.youtube.com/@MiraFAGBOHOUNTV" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Youtube className="size-4" /> @MiraFAGBOHOUNTV
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ICCTVToulouse" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Youtube className="size-4" /> ICC TV Toulouse
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/mirafagbohoun" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Instagram className="size-4" /> @mirafagbohoun
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/mirafagbohoun" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Facebook className="size-4" /> mirafagbohoun
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@mirafagbohoun" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <TikTok className="size-4" /> @mirafagbohoun
                </a>
              </li>
              <li>
                <a href="mailto:mirafagbohoun@gmail.com" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Mail className="size-4" /> mirafagbohoun@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Pasteur Mira Fagbohoun · Tous droits réservés.</p>
          <p className="font-display tracking-[0.2em]">ICC OCCITANIE · TOULOUSE</p>
        </div>
      </div>
    </footer>
  );
}
