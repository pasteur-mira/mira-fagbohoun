import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Inviter le Pasteur Mira Fagbohoun pour prêcher, intervenir en conférence ou événement. Réponse sous 5 jours ouvrés." },
      { property: "og:title", content: "Contact · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Faire appel au Pasteur Mira Fagbohoun." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  organisation: z.string().trim().min(2).max(150),
  email: z.string().trim().email().max(255),
  date: z.string().trim().max(50).optional(),
  type: z.string().trim().max(50),
  lieu: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(1500),
});

function Contact() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd.entries()));
    setLoading(false);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    const prev = JSON.parse(localStorage.getItem("bookings") ?? "[]");
    prev.push({ ...parsed.data, at: new Date().toISOString() });
    localStorage.setItem("bookings", JSON.stringify(prev));
    toast.success("Demande envoyée. Réponse sous 5 jours ouvrés.");
    e.currentTarget.reset();
  }

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <p className="eyebrow">Faire appel au Pasteur</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.9] text-foreground md:text-8xl">
          TRAVAILLER<br/><span className="text-primary">ENSEMBLE.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
          Vous souhaitez inviter le Pasteur Mira Fagbohoun pour prêcher dans votre église,
          intervenir lors d'une conférence ou d'un événement ? Remplissez le formulaire —
          l'équipe vous répondra dans les meilleurs délais.
        </p>
        <p className="mt-4 font-display text-[11px] tracking-[0.22em] text-primary">
          RÉPONSE SOUS 5 JOURS OUVRÉS.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-36">
        <div className="border border-border bg-card p-8 md:p-14">
          <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
            <Input label="Nom complet *" name="name" />
            <Input label="Organisation / Église *" name="organisation" />
            <Input label="Email *" name="email" type="email" />
            <Input label="Date souhaitée" name="date" type="date" />
            <div>
              <label className="eyebrow block">Type d'événement *</label>
              <select name="type" required defaultValue="Culte" className="mt-3 w-full border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none">
                <option>Culte</option>
                <option>Conférence</option>
                <option>Retraite</option>
                <option>Autre</option>
              </select>
            </div>
            <Input label="Lieu de l'événement *" name="lieu" />
            <div className="md:col-span-2">
              <label className="eyebrow block">Message / Contexte *</label>
              <textarea name="message" rows={6} required className="mt-3 w-full border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <button
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 bg-primary px-8 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "ENVOI..." : "ENVOYER LA DEMANDE"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Input({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input name={name} type={type} required={label.includes("*")} className="mt-3 w-full border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none" />
    </div>
  );
}