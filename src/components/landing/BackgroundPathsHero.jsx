// Hero con líneas animadas de fondo, adaptado del estilo "Background Paths" de 21st.dev (Kokonut UI).
import { motion, useReducedMotion } from "framer-motion";

function FloatingPaths({ position }) {
  const reduce = useReducedMotion();
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="h-full w-full text-[#2f6fe3]" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 0.5 }
                : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }
            }
            transition={reduce ? { duration: 0 } : { duration: 20 + (path.id % 10), repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPathsHero({ ctaHref, ctaExternal }) {
  const words = ["Sitios", "web", "que", "convierten", "visitas", "en", "clientes"];
  const highlight = new Set(["convierten", "clientes"]);

  return (
    <section id="top" className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-4 pt-28 pb-16">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#06060f]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.a
          href="#contacto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 sm:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Disponible para nuevos proyectos
        </motion.a>

        <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 120, damping: 20 }}
              className={
                "mr-3 inline-block last:mr-0 " +
                (highlight.has(word) ? "bg-gradient-to-r from-[#2f6fe3] to-[#8ab4ff] bg-clip-text text-transparent" : "")
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          Soy <span className="font-semibold text-white">Jhonjandrys</span>, desarrollador web fullstack en Colombia. Diseño y construyo
          landing pages, sitios para negocios y aplicaciones con IA para que vendas más en internet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
        >
          <a
            href={ctaHref}
            {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2f6fe3] px-7 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(47,111,227,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#3d7cf0] hover:shadow-[0_0_60px_rgba(47,111,227,0.6)] sm:w-auto"
          >
            Cotiza tu proyecto
            <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <a
            href="#proyectos"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white/90 backdrop-blur transition-all hover:border-white/30 hover:bg-white/10 sm:w-auto"
          >
            Ver proyectos
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex items-center gap-3 text-left"
        >
          <img src="/perfil.jpg" alt="Foto de Jhonjandrys" width="48" height="48" className="h-12 w-12 rounded-full border border-white/15 object-cover" />
          <div className="text-sm leading-tight">
            <p className="font-semibold text-white">Jhonjandrys Ramirez</p>
            <p className="text-white/50">Desarrollador fullstack en EFICI SAS · freelance desde 2023</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
