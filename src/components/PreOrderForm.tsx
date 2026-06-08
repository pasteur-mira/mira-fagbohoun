import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Nom trop court").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  quantity: z.coerce.number().int().min(1).max(50),
  message: z.string().trim().max(500).optional(),
});

export function PreOrderForm() {
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      quantity: fd.get("quantity") ?? 1,
      message: fd.get("message") ?? "",
    });
    setLoading(false);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }
    // Persist locally — backend wiring later
    const key = "preorders";
    const prev = JSON.parse(localStorage.getItem(key) ?? "[]");
    prev.push({ ...parsed.data, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(prev));
    toast.success("Pré-commande enregistrée. Vous serez notifié dès la sortie du livre.");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Field label="Nom complet" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Quantité souhaitée" name="quantity" type="number" defaultValue="1" required />
      <div>
        <label className="eyebrow block">Message (optionnel)</label>
        <textarea
          name="message"
          rows={4}
          className="mt-3 w-full border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-xs tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "ENVOI..." : "RÉSERVER MON EXEMPLAIRE"}
      </button>
      <p className="text-xs text-muted-foreground">
        Aucun paiement à cette étape · Vous serez recontacté à la sortie du livre.
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", required, defaultValue }: { label: string; name: string; type?: string; required?: boolean; defaultValue?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block">{label}{required && " *"}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="mt-3 w-full border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}