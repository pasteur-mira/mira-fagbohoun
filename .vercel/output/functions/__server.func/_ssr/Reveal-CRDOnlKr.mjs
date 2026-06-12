import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  titleClassName = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: eyebrow }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `mt-5 font-display text-4xl leading-[0.95] text-foreground md:text-6xl ${titleClassName}`, children: title }),
    intro && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-base leading-relaxed text-muted-foreground md:text-lg", children: intro })
  ] });
}
function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className,
      style: {
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.75s ease-out ${delay}ms, transform 0.75s ease-out ${delay}ms`
      },
      children
    }
  );
}
export {
  Reveal as R,
  SectionHeader as S
};
