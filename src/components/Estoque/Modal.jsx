import { Pencil, RefreshCcw, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import '../../styles/Modal.css'


function Modal({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const toggleModal = () => {
    if (!isOpen) {
      // Obter as coordenadas do botão
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.top + window.scrollY + 20, // Alinhar o modal verticalmente ao botão
        left: buttonRect.right + window.scrollX - 170, // Posição à direita do botão com 10px de espaço
      });
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <button ref={buttonRef} onClick={toggleModal} className="open-modal-btn">
        ...
      </button>

      {isOpen && (
        <div
          className="modal-content"
          style={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <button className="close-btn" onClick={toggleModal}>
            X
          </button>
          <ul className="modal-options">
            <li className="modal-item">
              <span className="icon"><Pencil size={18}/></span> Editar
            </li>
            <li className="modal-item">
              <span className="icon"><Trash2 size={18}/></span> Excluir item
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Modal;
