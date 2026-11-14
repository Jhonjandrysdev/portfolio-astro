// Casos de estudio con efecto de inclinación y desplazamiento al hacer scroll
// (inspirado en "Hero Parallax" de 21st.dev / Aceternity UI).
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function CaseCard({ item, index }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [18, 0, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const reversed = index % 2 === 1;

  return (
    <article ref={ref} className="grid items-center gap-8 md:grid-cols-2 md:gap-12" style={{ perspective: 1200 }}>
      <motion.div
        style={reduce ? undefined : { rotateX, scale }}
        className={"group relative " + (reversed ? "md:order-2" : "")}
      >
        <div className="absolute -inset-4 rounded-[2rem] bg-[#2f6fe3]/20 opacity-60 blur-3xl transition-opacity group-hover:opacity-100" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b18] shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <img
            src={item.image}
            alt={`Captura del proyecto ${item.title}`}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </motion.div>

      <motion.div style={reduce ? undefined : { y }} className={reversed ? "md:order-1" : ""}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-[#2f6fe3]/40 bg-[#2f6fe3]/10 px-3 py-1 text-xs font-semibold text-[#8ab4ff]">{item.label}</span>
          <span className="text-xs font-medium uppercase tracking-widest text-white/40">{item.client}</span>
        </div>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{item.title}</h3>
        <p className="mt-3 text-base text-white/65">{item.summary}</p>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-white">El reto</dt>
            <dd className="mt-1 text-white/55">{item.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold text-white">La solución</dt>
            <dd className="mt-1 text-white/55">{item.solution}</dd>
          </div>
        </dl>
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{t}</li>
          ))}
        </ul>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-[#2f6fe3]/60 hover:bg-[#2f6fe3]/15"
          >
            Ver proyecto en vivo <span aria-hidden="true">↗</span>
          </a>
        )}
      </motion.div>
    </article>
  );
}

export default function ParallaxCases({ cases }) {
  return (
    <div className="flex flex-col gap-24 md:gap-32">
      {cases.map((item, i) => (
        <CaseCard key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}
