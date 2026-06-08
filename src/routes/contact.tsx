import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Instagram, Youtube, Facebook } from "lucide-react";
import { contactApi } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Pasteur Mira Fagbohoun" },
      { name: "description", content: "Contacter le Pasteur Mira Fagbohoun — email et réseaux sociaux." },
      { property: "og:title", content: "Contact · Pasteur Mira Fagbohoun" },
      { property: "og:description", content: "Contacter le Pasteur Mira Fagbohoun." },
    ],
  }),
  component: Contact,
});


function TikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.02-.07z" />
    </svg>
  );
}

const socials = [
  { icon: Mail,      label: "mirafagbohoun@gmail.com", href: "mailto:mirafagbohoun@gmail.com", desc: "Email" },
  { icon: Youtube,   label: "@MiraFAGBOHOUNTV",        href: "https://www.youtube.com/@MiraFAGBOHOUNTV", desc: "YouTube" },
  { icon: Youtube,   label: "ICC TV Toulouse",          href: "https://www.youtube.com/@ICCTVToulouse",   desc: "YouTube" },
  { icon: Instagram, label: "@mirafagbohoun",           href: "https://www.instagram.com/mirafagbohoun", desc: "Instagram" },
  { icon: Facebook,  label: "mirafagbohoun",            href: "https://www.facebook.com/mirafagbohoun", desc: "Facebook" },
  { icon: TikTok,    label: "@mirafagbohoun",           href: "https://www.tiktok.com/@mirafagbohoun", desc: "TikTok" },
];

function Contact() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await contactApi.send({
        full_name: fd.get("name") as string,
        email: fd.get("email") as string,
        message: fd.get("message") as string,
      });
      toast.success("Message envoyé. L'équipe vous répondra rapidement.");
      e.currentTarget.reset();
    } catch (err: any) {
      toast.error(err.message ?? "Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="w-full overflow-x-hidden px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <p className="eyebrow">Prendre contact</p>
          <h1 className="mt-6 font-display text-4xl leading-[0.9] text-foreground md:text-6xl font-semibold">
            RESTONS EN<br /><span className="text-primary">CONTACT.</span>
          </h1>
          <p className="mt-8 text-sm text-muted-foreground md:text-lg">
            Pour inviter le Pasteur Mira Fagbohoun ou pour toute demande, écrivez directement via le formulaire ou par email.
          </p>
        </div>
      </section>

      <section className="w-full overflow-x-hidden px-6 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* SOCIALS — gauche */}
          <div className="min-w-0 md:col-span-5 flex flex-col gap-3">
            <p className="eyebrow mb-2">Retrouvez-nous sur</p>
            <ul className="space-y-6">
              {socials.map(({ icon: Icon, label, href, desc }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={href.startsWith("mailto") ? undefined : "noreferrer"}
                    className="inline-flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="size-6 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="eyebrow mb-0.5 text-[10px]">{desc}</p>
                      <p className="truncate text-sm font-medium md:text-base">{label}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* FORM — droite */}
          <div className="min-w-0 md:col-span-7">
            <div className="border border-border bg-card p-4 md:p-12">
              <p className="eyebrow mb-6">Formulaire de contact</p>
              <form onSubmit={onSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="eyebrow block">Nom complet *</label>
                  <input name="name" type="text" required className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="eyebrow block">Email *</label>
                  <input name="email" type="email" required className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="eyebrow block">Message *</label>
                  <textarea name="message" rows={6} required className="mt-3 w-full border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <button
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? "ENVOI..." : "ENVOYER LE MESSAGE"}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
        </div>
      </section>
    </>
  );
}
