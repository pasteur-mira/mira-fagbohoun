import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const stats = [
  { value: 67, suffix: "K+", label: "Abonnés ICC TV Toulouse" },
  { value: 8, suffix: " ans", label: "De ministère actif" },
  { value: 4, suffix: "", label: "Nations touchées" },
  { value: 50, suffix: "+", label: "Conférences & cultes / an" },
];

function CountUp({ to, active, duration = 1500 }: { to: number; active: boolean; duration?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(ease * to));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [active, to, duration]);

  return <>{val}</>;
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setActive(true); obs.disconnect(); }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-foreground text-background">
      <div className="mx-auto grid max-w-[1400px] md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="border-b border-white/10 px-10 py-14 text-center md:border-b-0 md:border-r md:last:border-r-0">
            <p className="font-display text-5xl font-bold text-primary md:text-6xl">
              <CountUp to={s.value} active={active} duration={1200 + i * 100} />
              {s.suffix}
            </p>
            <p className="mt-3 text-sm text-background/50 uppercase tracking-widest">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
