import { Pencil, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import api from "../../api";

function Modal({ volunteer, editar, modalEditar, setVoluntarios, voluntarios }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const toggleModal = () => {
    if (!isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.top + window.scrollY + 20,
        left: buttonRect.right + window.scrollX - 170,
      });
    }
    setIsOpen(!isOpen);
  };

  const editarVoluntario = () => {
    if (!isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.top + window.scrollY + 20,
        left: buttonRect.right + window.scrollX - 170,
      });
    }
    editar(volunteer);
    modalEditar(true);
    setIsOpen(!isOpen);
  };

  async function deletarVoluntario() {
    await api.delete(`/usuarios/${volunteer.id}`)

    setVoluntarios(voluntarios.filter((pr) => pr.id !== volunteer.id));
    setIsOpen(false);
  }

  return (
    <div className="App">
      <button ref={buttonRef} onClick={toggleModal} className="open-modal-btn">
        ...
      </button>

      {isOpen && (
        <div
          className="w-[150px] bg-white p-1.5 rounded-lg absolute text-left shadow-md z-[1000] border-3 border-black"
          style={{
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <button 
          className="absolute top-2.5 right-2.5 bg-none border-none text-lg cursor-pointer" 
          onClick={toggleModal}>
            X
          </button>
          <ul className="list-none p-0 m-0">
            <li onClick={editarVoluntario} className="flex items-center py-2 cursor-pointer">
              <span className="mr-2.5">
                <Pencil size={18} />
              </span>{" "}
              Editar
            </li>
            <li onClick={deletarVoluntario} className="flex items-center py-2 cursor-pointer">
              <span className="mr-2.5">
                <Trash2 size={18} />
              </span>
              Excluir item
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Modal;
