import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

const testimonials = [
  {
    quote: "Le Pasteur Mira Fagbohoun a un don rare : rendre la Parole à la fois profonde et immédiatement applicable. Son enseignement sur l'autorité spirituelle a transformé notre assemblée.",
    author: "Pasteur Jean-Claude Mbarga",
    role: "Responsable d'église · Paris",
  },
  {
    quote: "Une parole ancrée, une vision claire, un homme qui bâtit. Notre conférence régionale n'aurait pas été la même sans sa présence. Il est venu avec une parole apostolique.",
    author: "Pasteur Emmanuel Dossou",
    role: "Église Nouvelle Vie · Lyon",
  },
  {
    quote: "Chaque fois que le Pasteur Mira intervient, c'est une génération entière qui reçoit une impartation. Un ministère d'excellence et de maturité qui marque durablement.",
    author: "Évangéliste Sarah Koné",
    role: "Réseau ICC International",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => goTo((active + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [active]);

  function goTo(i: number) {
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 250);
  }

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden">
      {/* Background accent */}
      <div aria-hidden className="absolute -left-40 top-1/2 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />

      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mb-16 text-center">
          <p className="eyebrow inline-block">Témoignages</p>
          <h2 className="mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-5xl">
            CE QU'ILS <span className="highlight-circle">DISENT.</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          {/* Quote mark */}
          <div className="mx-auto mb-8 flex justify-center">
            <span className="font-serif text-8xl leading-none text-primary">"</span>
          </div>

          {/* Quote text */}
          <div
            className="min-h-[120px] transition-all duration-250"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)" }}
          >
            <blockquote className="mx-auto max-w-3xl text-center font-serif-italic text-xl leading-relaxed text-foreground md:text-2xl">
              {t.quote}
            </blockquote>
            <div className="mt-8 text-center">
              <p className="font-display text-sm tracking-[0.18em] text-foreground">{t.author}</p>
              <p className="mt-1 text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              aria-label="Précédent"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Témoignage ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((active + 1) % testimonials.length)}
              className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              aria-label="Suivant"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
