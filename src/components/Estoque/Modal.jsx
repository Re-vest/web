import { Pencil, Trash2 } from "lucide-react";
import { useState, useRef, useContext } from "react";
import modal from "../../styles/Modal.module.css";
import api from '../../api'
import { UserContext } from "../../Contexts/UserContext";

function Modal({ product, editar, modalEditar, setProdutos, produtos, desfazer, setDesfazer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const { user } = useContext(UserContext)

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

  const opcoesStatus = [
    { label: "Disponível", value: "DISPONIVEL" },
    { label: "Oculto", value: "OCULTO" },
    { label: "Vendido", value: "VENDIDO" },
  ]

  const editarProduto = () => {
    if (!isOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.top + window.scrollY + 20,
        left: buttonRect.right + window.scrollX - 170,
      });
    }
    // product.status = opcoesStatus.find(status => status.value === product.status).label
    editar(product);
    modalEditar(true);
    setIsOpen(!isOpen);
  };

  async function deleteProduto() {
    let desfazerAux = desfazer
    desfazerAux.push(product)
    setDesfazer(desfazerAux)

    try {
      await api.delete(`/produtos/${product.id}?idUsuario=${sessionStorage.ID_USER}`)

      setProdutos(produtos.filter((pr) => pr.id !== product.id));
      swal("Produto excluído com sucesso!", "", "success");
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
