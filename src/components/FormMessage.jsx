import ModalMessage from '../components/ModalMessage'
import { Toaster, toast } from "sonner";
import { useState } from 'react';
const ContactForm = () => {

   const [isModalOpen, setModalOpen] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append("_next", "http://localhost:4321");
    formData.append("_captcha", "false");

     fetch('https://formsubmit.co/jhonjandrysramirez10@gmail.com', {method:"POST", body: formData}).then((response) => {
         if (response.ok) {
             setTimeout(() => {
                 toast.success(
                   "Correo enviado correctamente");
                 });
                event.target.reset()
                setModalOpen(true);
            } 
     }).catch((err) => {
         console.error(err)
     })
  };
  return (
    <>
      <section>
        <div className="py-8 lg:py-14 px-4 mx-auto max-w-screen-md">
          <p class="mb-8 lg:mb-16 font-semibold text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            No dudes en ponerte en contacto conmigo a través de este formulario
            o directamente a mi correo electrónico para cualquier proyecto o
            asesoria en la idea de tu pagina web.
          </p>
          <form
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <Toaster
              richColors
              expand={true}
              position="top-right"
            />
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 dark:bg-white/15 dark:border-white/40 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe tu nombre"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 dark:bg-white/15 dark:border-white/40 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe tu correo electronico"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                rows="6"
                name="message"
                className="block p-2.5 w-full text-sm rounded-lg shadow-sm border border-white focus:ring-primary-500 focus:border-primary-500 dark:bg-white/15 dark:border-white/40 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe tu mensaje"
              ></textarea>
            </div>
            <button
              type="submit"
              className="border rounded-full inline-flex gap-x-2 py-2 justify-center items-center px-3 text-sm font-medium hover:bg-gray-100 dark:[background-color:#2f6fe3] dark:border-white hover:font-bold dark:hover:[background-color:#2815c3] dark:text-white hover:scale-110 transition"
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
