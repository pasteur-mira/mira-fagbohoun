import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Pasteur associé · ICC Occitanie</p>
            <h3 className="mt-4 font-display text-3xl leading-[0.95] text-foreground md:text-5xl">
              MIRA<br />FAGBOHOUN
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
                <a href="https://www.youtube.com/@ICCTVToulouse" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Youtube className="size-4" /> ICC TV Toulouse
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Instagram className="size-4" /> @pst.mira.fagbohoun
                </a>
              </li>
              <li>
                <Link to="/contact" className="inline-flex items-center gap-3 text-foreground hover:text-primary">
                  <Mail className="size-4" /> Booking & contact
                </Link>
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