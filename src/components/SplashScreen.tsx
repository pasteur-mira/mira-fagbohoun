import { useEffect, useState } from "react";
import logoBlanc from "@/assets/logo-blanc.png";

export function SplashScreen() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splash_shown")) {
      setGone(true);
      return;
    }
    const t1 = setTimeout(() => setLeaving(true), 2000);
    const t2 = setTimeout(() => {
      setGone(true);
      sessionStorage.setItem("splash_shown", "1");
    }, 2750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)",
      }}
    >
      {/* Logo */}
      <img
        src={logoBlanc}
        alt=""
        className="h-16 w-auto md:h-20"
        style={{
          opacity: leaving ? 0 : 1,
          transform: leaving ? "translateY(-8px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      />

      {/* Barre de progression */}
      <div className="mt-8 h-px w-32 overflow-hidden bg-white/15">
        <div className="h-full bg-primary" style={{ animation: "splash-bar 1.8s ease-out 0.1s forwards", transform: "scaleX(0)", transformOrigin: "left" }} />
      </div>
    </div>
  );
}
