// Hero con líneas animadas de fondo (estilo "Background Paths" de 21st.dev), foto con borde animado,
// palabra rotativa, luz que sigue al mouse e insignias flotantes.
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

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
            animate={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }}
            transition={reduce ? { duration: 0 } : { duration: 20 + (path.id % 10), repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

const ROTATING = ["clientes", "ventas", "contactos", "resultados"];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-flex overflow-hidden pb-2 align-bottom">
      <motion.span
        key={ROTATING[i]}
        initial={{ y: "70%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        <span className="text-[#6fa3ff] [text-shadow:0_0_30px_rgba(47,111,227,0.55)]">{ROTATING[i]}</span>
      </motion.span>
    </span>
  );
}

function Badge({ className, delay, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={reduce ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={
        reduce
          ? { duration: 0.4, delay }
          : { opacity: { duration: 0.5, delay }, scale: { duration: 0.5, delay }, y: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" } }
      }
      className={"absolute z-20 flex items-center gap-2 rounded-2xl border border-white/15 bg-[#0b0f24]/80 px-3.5 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md sm:text-sm " + className}
    >
      {children}
    </motion.div>
  );
}

function PhotoCard() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });

  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-[240px] sm:w-[300px] lg:w-[380px]"
      style={{ perspective: 1000 }}
    >
      <div className="absolute -inset-10 rounded-full bg-[#2f6fe3]/30 blur-3xl" aria-hidden="true" />
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* borde con degradado giratorio */}
        <div className="hero-ring relative overflow-hidden rounded-[2rem] p-[2px]">
          <div className="relative overflow-hidden rounded-[calc(2rem-2px)] bg-[#06060f]">
            <img
              src="/perfil-retrato.jpg"
              alt="Jhonjandrys Ramirez, desarrollador web"
              width="720"
              height="960"
              fetchpriority="high"
              className="aspect-[4/5] w-full object-cover object-[50%_30%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#06060f] via-[#06060f]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-base font-bold text-white sm:text-lg">Jhonjandrys Ramirez</p>
              <p className="text-xs text-white/70 sm:text-sm">Desarrollador web fullstack</p>
            </div>
          </div>
        </div>

        <Badge className="-left-6 top-10 sm:-left-14" delay={1.1}>
          <span className="text-base" aria-hidden="true">⚡</span> Landing pages
        </Badge>
        <Badge className="-right-4 top-[64%] sm:-right-12" delay={1.35}>
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> +2 años creando webs
        </Badge>
        <Badge className="-left-4 bottom-24 hidden sm:flex sm:-left-16" delay={1.6}>
          <span className="text-base" aria-hidden="true">✦</span> Apps con IA
        </Badge>
      </motion.div>
    </motion.div>
  );
}

export default function BackgroundPathsHero({ ctaHref, ctaExternal }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 30 });

  const onMove = (e) => {
    if (reduce || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const words = ["Sitios", "web", "que", "convierten", "visitas", "en"];

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-4 pt-28 pb-16"
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      {/* luz que sigue al mouse */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{ background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(47,111,227,0.16), transparent 60%)` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#06060f]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Disponible para nuevos proyectos
          </motion.a>

          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.2rem]">
            {words.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 120, damping: 20 }}
                className={"mr-3 inline-block " + (word === "convierten" ? "bg-gradient-to-r from-[#2f6fe3] to-[#8ab4ff] bg-clip-text text-transparent" : "")}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 120, damping: 20 }}
              className="inline-block"
            >
              <RotatingWord />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Soy <span className="font-semibold text-white">Jhonjandrys</span>, desarrollador web fullstack en Colombia. Diseño y construyo
            landing pages, sitios para negocios y aplicaciones con IA para que vendas más en internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href={ctaHref}
              {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="shine group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[#2f6fe3] px-7 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(47,111,227,0.45)] transition-all hover:-translate-y-0.5 hover:bg-[#3d7cf0] hover:shadow-[0_0_60px_rgba(47,111,227,0.6)] sm:w-auto"
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

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50 lg:justify-start"
          >
            <li>✓ Diseño a medida</li>
            <li>✓ Optimizado para celular</li>
            <li>✓ Listo para Google</li>
          </motion.ul>
        </div>

        <div className="order-1 lg:order-2">
          <PhotoCard />
        </div>
      </div>
    </section>
  );
}
