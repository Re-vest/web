import { Pencil, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import modal from "../../styles/Modal.module.css";
import api from '../../api'

function Modal({ product, editar, modalEditar, setProdutos, produtos }) {
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

  const editarProduto = () => {
    if (!isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.top + window.scrollY + 20,
        left: buttonRect.right + window.scrollX - 170,
      });
    }
    editar(product);
    modalEditar(true);
    setIsOpen(!isOpen);
  };

  async function deleteProduto() {
    try {
      await api.delete(`/produtos/${product.id}?idUsuario=${sessionStorage.ID_USER}`)

      setProdutos(produtos.filter((pr) => pr.id !== product.id));
    } catch(e) {
      console.log(e);
    }
    setIsOpen(false);
  }

  return (
    <div className={modal["App"]}>
      <button ref={buttonRef} onClick={toggleModal} className={modal["open-modal-btn"]}>
        ...
      </button>

      {isOpen && (
        <div
          className={modal["modal-content"]}
          style={{
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        >
          <button className={modal["close-btn"]} onClick={toggleModal}>
            X
          </button>
          <ul className={modal["modal-options"]}>
            <li onClick={editarProduto} className={modal["modal-item"]}>
              <span className={modal["icon"]}>
                <Pencil size={18} />
              </span>{" "}
              Editar
            </li>
            <li onClick={deleteProduto} className={modal["modal-item"]}>
              <span className={modal["icon"]}>
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
