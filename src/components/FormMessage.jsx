import ModalMessage from "../components/ModalMessage";
import { Toaster, toast } from "sonner";
import { useState } from "react";
const ContactForm = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const message = formData.get('message');

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
          setTimeout(() => {
            toast.success("Correo enviado correctamente");
          });
          event.target.reset();
          setModalOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <section>
        <div className="py-8 lg:py-14 px-4 mx-auto max-w-screen-md">
          <p class="mb-8 lg:mb-16 font-semibold text-center text-gray-400 sm:text-xl">
            No dudes en contactarme a través de este formulario o directamente a
            mi correo electrónico para discutir cualquier proyecto o recibir
            asesoría personalizada en el desarrollo de tu página web.
          </p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <Toaster richColors expand={true} position="top-right" />
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium  text-gray-300"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 bg-white/15 border-white/40 dark:placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="Escribe tu nombre"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 bg-white/15 border-white/40 dark:placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="Escribe tu correo electronico"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-300"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 bg-white/15 border-white/40 dark:placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                placeholder="Escribe tu mensaje"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border rounded-full inline-flex gap-x-2 py-2 justify-center items-center px-3 text-sm font-medium hover:bg-gray-100 [background-color:#2f6fe3] border-white hover:font-bold hover:[background-color:#2815c3] text-white hover:scale-110 transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </section>
      <ModalMessage isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
export default ContactForm;
