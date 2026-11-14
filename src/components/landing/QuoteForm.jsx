// Formulario de cotización: arma el mensaje y lo abre en WhatsApp.
import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../data/site.js";

const SERVICES = [
  "Landing page",
  "Sitio web para mi negocio",
  "Sitio en WordPress",
  "Aplicación web con IA",
  "Otro / no estoy seguro",
];

export default function QuoteForm() {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) return setError("Escribe tu nombre.");
    if (message.length < 10) return setError("Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres).");
    setError("");

    const text = [
      `Hola Jhonjandrys, soy ${name}.`,
      `Quiero cotizar: ${service}.`,
      "",
      message,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 transition-all duration-200 focus:border-[#25D366]/60 focus:bg-white/[0.08] focus:outline-none";
  const labelClass = "text-xs font-semibold uppercase tracking-widest text-white/50";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur sm:p-8" noValidate>
      <div>
        <h3 className="text-lg font-bold text-white">Cotiza por WhatsApp</h3>
        <p className="mt-1 text-sm text-white/50">Llena estos datos y se abrirá WhatsApp con tu mensaje listo para enviar.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="q-name" className={labelClass}>Nombre</label>
        <input id="q-name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="q-service" className={labelClass}>¿Qué necesitas?</label>
        <select id="q-service" name="service" className={inputClass + " appearance-none"} defaultValue={SERVICES[0]}>
          {SERVICES.map((s) => (
            <option key={s} value={s} className="bg-[#0b0b18]">{s}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="q-message" className={labelClass}>Tu proyecto</label>
        <textarea id="q-message" name="message" rows={4} placeholder="Cuéntame qué tienes en mente, para cuándo lo necesitas..." className={inputClass + " resize-none"} />
      </div>

      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 font-semibold text-[#062b14] shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(37,211,102,0.45)] active:translate-y-0"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>
        Enviar por WhatsApp
      </button>
    </form>
  );
}
