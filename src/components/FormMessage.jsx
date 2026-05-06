import ModalMessage from "../components/ModalMessage";
import { Toaster, toast } from "sonner";
import { useState } from "react";

const ContactForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const message = formData.get("message");

    if (name.length < 3) {
      toast.error("El nombre debe tener al menos 3 caracteres.");
      return;
    }
    if (message.length < 10) {
      toast.error("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    formData.append("_next", "https://jhonjandrysdev.netlify.app");
    formData.append("_captcha", "false");

    fetch("https://formsubmit.co/cd3d005e4ae3085579e67b3347577b46", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Correo enviado correctamente");
          event.target.reset();
          setModalOpen(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#2f6fe3]/60 focus:bg-white/8 transition-all duration-200";

  return (
    <>
      <Toaster richColors expand position="top-right" />

      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8 max-w-2xl mx-auto">
        <p className="text-sm text-white/50 mb-8 leading-relaxed">
          ¿Tienes un proyecto en mente o quieres hablar? Escríbeme y te respondo
          a la brevedad. También puedes contactarme directamente a{" "}
          <a
            href="mailto:jhonjandrysramirez10@gmail.com"
            className="text-[#2f6fe3] hover:underline"
          >
            jhonjandrysramirez10@gmail.com
          </a>
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClass}
                placeholder="Tu nombre"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-white/50 uppercase tracking-widest">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClass}
                placeholder="tu@correo.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-semibold text-white/50 uppercase tracking-widest">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className={inputClass + " resize-none"}
              placeholder="Cuéntame sobre tu proyecto..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#2f6fe3] hover:bg-[#1a4db5] text-white shadow-[0_0_20px_rgba(47,111,227,0.3)] hover:shadow-[0_0_28px_rgba(47,111,227,0.5)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>

      <ModalMessage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default ContactForm;
