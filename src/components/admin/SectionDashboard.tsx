import { type User } from "@/lib/api";
import { StatCard } from "./shared";

export function SectionDashboard({ user }: { user: User }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground mb-6">BONJOUR, {user.name.toUpperCase()}</h2>
      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        <StatCard label="Utilisateur" value={user.name} />
        <StatCard label="Rôle"        value={user.role.toUpperCase()} />
        <StatCard label="Email"       value={user.email} />
      </div>
      <div className="border border-border bg-card p-8 text-center text-muted-foreground">
        <p className="font-display text-sm tracking-[0.18em]">MODULES À VENIR</p>
        <p className="mt-2 text-sm">Agenda · Prédications · Livre · Ressources</p>
      </div>
    </div>
  );
}
