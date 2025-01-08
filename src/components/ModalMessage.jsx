import Sucess from "../icons/Sucess";

const ModalMessage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
          onClick={onClose}>
          ✕
        </button>
        <div className="p-4 text-center flex items-center justify-center flex-col">
          <Sucess/>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-white">
            Gracias por contactarme, pronto me comunicaré contigo para empezar con este proyecto. 😊
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ModalMessage;
