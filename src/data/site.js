// Datos centrales del sitio. Cambia aquí y se actualiza en toda la página.

// Número de WhatsApp en formato internacional sin "+" ni espacios (ej: "573001234567").
// Mientras esté vacío, los botones de "Cotiza tu proyecto" llevan al formulario de contacto.
export const WHATSAPP_NUMBER = "573022825766";

const WHATSAPP_TEXT = "Hola Jhonjandrys, vi tu portafolio y quiero cotizar un sitio web.";

export const CTA_HREF = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`
  : "#contacto";

export const CTA_IS_EXTERNAL = Boolean(WHATSAPP_NUMBER);

export const SOCIAL = {
  linkedin: "https://www.linkedin.com/in/jhonjandrysdev/",
  github: "https://github.com/Jhonjandrysdev",
  email: "jhonjandrysramirez10@gmail.com",
};

export const SERVICES = [
  {
    title: "Landing pages que venden",
    description:
      "Páginas de venta para cursos, lanzamientos y servicios, diseñadas para que el visitante deje sus datos o compre.",
    bullets: ["Diseño enfocado en conversión", "Testimonios, precios y llamados a la acción", "Carga rápida en celular"],
    highlight: true,
  },
  {
    title: "Sitios web para negocios",
    description: "Tu negocio con una web profesional que transmite confianza y aparece en Google.",
    bullets: ["Varias páginas", "SEO básico", "Formulario y WhatsApp"],
  },
  {
    title: "WordPress y Elementor",
    description: "Sitios que tú mismo puedes editar sin depender de nadie.",
    bullets: ["Plantillas a medida", "Panel administrable", "Capacitación incluida"],
  },
  {
    title: "Aplicaciones web con IA",
    description: "Paneles, automatizaciones e integraciones con inteligencia artificial para tu empresa.",
    bullets: ["Integraciones con IA", "Bases de datos", "Paneles a medida"],
    wide: true,
  },
];

export const CASES = [
  {
    client: "The Savage Fork",
    label: "Proyecto para cliente",
    title: "Esfuerzo Inteligente",
    summary: "Página de ventas para un curso de planificación de comidas dirigido a público hispanohablante.",
    problem: "Necesitaban vender su curso online con una página clara y confiable.",
    solution: "Landing en WordPress + Elementor con testimonios, precios y llamados a la acción en cada sección.",
    image: "/esfuerzo-inteligente.jpg",
    link: "https://thesavagefork.com/esfuerzo-inteligente/",
    tags: ["WordPress", "Elementor", "Conversión"],
  },
  {
    client: "EFICI SAS",
    label: "En producción",
    title: "Social IA",
    summary: "Módulo que automatiza las redes sociales de pequeños y medianos comercios con IA.",
    problem: "Los comercios no tienen tiempo para crear y programar contenido.",
    solution: "Genera posts e historias con IA, los programa en un calendario y mide su rendimiento. Más de 245 publicaciones generadas.",
    image: "/social-efici.png",
    link: "https://efici.co/",
    tags: ["Nuxt", "NestJS", "PostgreSQL", "IA"],
  },
  {
    client: "Proyecto institucional",
    label: "Beta",
    title: "DATAJEP",
    summary: "Extracción automática con IA de información de audiencias de la JEP de Colombia.",
    problem: "Revisar horas de video a mano para extraer datos clave era lento.",
    solution: "Procesa los videos, extrae alias, cargos, lugares y hechos, y genera reportes en Excel con formato institucional.",
    image: "/datajep.png",
    link: null,
    tags: ["Next.js", "TypeScript", "Docker", "IA"],
  },
];

export const PROCESS = [
  { title: "Reunión y propuesta", description: "Hablamos de tu negocio y tus objetivos. Te envío una propuesta con alcance, tiempos y precio." },
  { title: "Diseño", description: "Preparo el diseño de tu sitio y lo ajustamos juntos antes de programar." },
  { title: "Desarrollo", description: "Construyo tu sitio rápido, seguro y adaptado a celulares, con avances que puedes revisar." },
  { title: "Lanzamiento y soporte", description: "Publicamos tu sitio, te enseño a usarlo y te acompaño después del lanzamiento." },
];

export const FAQ = [
  {
    q: "¿Cuánto tarda en estar listo mi sitio?",
    a: "Una landing page suele estar lista en 1 a 2 semanas y un sitio de varias páginas en 3 a 4 semanas, según el contenido y los ajustes.",
  },
  {
    q: "¿Cómo son los pagos?",
    a: "Normalmente 50% al iniciar y 50% al entregar. Para proyectos más grandes podemos dividirlo por etapas.",
  },
  {
    q: "¿Podré editar mi sitio yo mismo?",
    a: "Sí. Si quieres editar textos e imágenes por tu cuenta, lo hacemos en WordPress y te enseño a usarlo.",
  },
  {
    q: "¿Me ayudas con el dominio y el hosting?",
    a: "Sí, te recomiendo opciones según tu presupuesto y dejo todo configurado y publicado.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "Incluyo un periodo de soporte para resolver dudas y ajustes. Después podemos acordar un plan de mantenimiento.",
  },
];
