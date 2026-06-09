import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MessageSquare, CalendarDays, Mic2, BookOpen, ShoppingBag, Image, Repeat, Menu, ChevronRight } from "lucide-react";
import { authApi, getToken, setToken, clearToken, type User } from "@/lib/api";
import { Spinner } from "@/components/admin/shared";
import { SectionContacts } from "@/components/admin/SectionContacts";
import { SectionAgenda } from "@/components/admin/SectionAgenda";
import { SectionPredications } from "@/components/admin/SectionPredications";
import { SectionNotes } from "@/components/admin/SectionNotes";
import { SectionOrders } from "@/components/admin/SectionOrders";
import { SectionBanners } from "@/components/admin/SectionBanners";
import { SectionRecurringEvents } from "@/components/admin/SectionRecurringEvents";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Administration · Pasteur Mira Fagbohoun" }],
  }),
  component: Admin,
});

type Section = "contacts" | "agenda" | "predications" | "notes" | "orders" | "banners" | "recurring";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "contacts",     label: "Messages",            icon: MessageSquare },
  { id: "agenda",       label: "Agenda",              icon: CalendarDays },
  { id: "predications", label: "Prédications",        icon: Mic2 },
  { id: "notes",        label: "Notes & Études",      icon: BookOpen },
  { id: "orders",       label: "Commandes",           icon: ShoppingBag },
  { id: "banners",      label: "Bannières Hero",      icon: Image },
  { id: "recurring",    label: "Programme hebdo",     icon: Repeat },
];

/* ─── Root ─── */
function Admin() {
  const [user,     setUser]     = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!getToken()) { setChecking(false); return; }
    authApi.me()
      .then((res) => setUser(res.data))
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, []);

  if (checking) return <Spinner />;
  if (!user)    return <LoginPage onSuccess={setUser} />;
  return <AdminShell user={user} onLogout={() => { clearToken(); setUser(null); }} />;
}

/* ─── Shell with sidebar ─── */
function AdminShell({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [section,  setSection]  = useState<Section>("contacts");
  const [sideOpen, setSideOpen] = useState(false);

  async function handleLogout() {
    try { await authApi.logout(); } catch {}
    onLogout();
  }

  const active = NAV_ITEMS.find((n) => n.id === section)!;

  return (
    <div className="flex min-h-screen bg-background">

      {/* Overlay mobile */}
      {sideOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSideOpen(false)} />
      )}

      <aside className={`
        fixed top-0 left-0 z-40 flex h-full w-64 flex-col border-r border-border bg-card
        transition-transform duration-200
        ${sideOpen ? "translate-x-0" : "-translate-x-full"}
        lg:static lg:translate-x-0 lg:z-auto
      `}>
        <div className="border-b border-border px-6 py-5">
          <p className="eyebrow mb-1">Back-office</p>
          <p className="font-display text-base text-foreground leading-tight">MIRA FAGBOHOUN</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => { setSection(id); setSideOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 rounded px-3 py-2.5 text-sm transition-colors text-left
                    ${section === id
                      ? "bg-primary/10 text-foreground font-medium"
                      : "text-muted-foreground hover:bg-background hover:text-foreground"}
                  `}
                >
                  <Icon className={`size-4 shrink-0 ${section === id ? "text-primary" : ""}`} />
                  {label}
                  {section === id && <ChevronRight className="ml-auto size-3 text-primary" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-4 py-4">
          <p className="text-xs font-medium text-foreground truncate">{user.name}</p>
          <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-3 w-full border border-border py-2 font-display text-[10px] tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            DÉCONNEXION
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center gap-4 border-b border-border bg-card px-6 py-4">
          <button onClick={() => setSideOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="size-5" />
          </button>
          <p className="font-display text-base text-foreground">{active.label.toUpperCase()}</p>
          <div className="ml-auto hidden sm:block">
            <span className="text-xs text-muted-foreground">
              Connecté en tant que <span className="text-accent font-medium">{user.role}</span>
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {section === "contacts"     && <SectionContacts />}
          {section === "agenda"       && <SectionAgenda />}
          {section === "predications" && <SectionPredications />}
          {section === "notes"       && <SectionNotes />}
          {section === "orders"      && <SectionOrders />}
          {section === "banners"     && <SectionBanners />}
          {section === "recurring"   && <SectionRecurringEvents />}
        </main>
      </div>
    </div>
  );
}

/* ─── Page login ─── */
function LoginPage({ onSuccess }: { onSuccess: (u: User) => void }) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await authApi.login(fd.get("email") as string, fd.get("password") as string);
      setToken(res.data.token);
      onSuccess(res.data.user);
    } catch (err: any) {
      setError(err.message ?? "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="eyebrow mb-2">Back-office</p>
          <h1 className="font-display text-3xl text-foreground">ADMINISTRATION</h1>
        </div>
        <div className="border border-border bg-card p-8">
          {error && <p className="mb-5 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div>
              <label className="eyebrow block">Email</label>
              <input name="email" type="email" required autoComplete="email"
                className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="eyebrow block">Mot de passe</label>
              <input name="password" type="password" required autoComplete="current-password"
                className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
            </div>
            <button disabled={loading}
              className="mt-2 w-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 disabled:opacity-50">
              {loading ? "CONNEXION..." : "SE CONNECTER"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
