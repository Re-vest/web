import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ModalProduto.css"; // Importação do CSS

Modal.setAppElement("#root");

const CadastroProdutoModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Produto cadastrado");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Produto"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Controle de Estoque › Adicionar Produto</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="select-options">
          <div className="select-tipo">
            <label>Tipo:</label>
            <select>
              <option value="">Selecione</option>
              {/* Opções do tipo */}
            </select>
          </div>

          <div className="select-categoria">
            <label>Categoria:</label>
            <select>
              <option value="">Selecione</option>
              {/* Opções do tipo */}
            </select>
          </div>
        </div>

        <div className="input-nome">
          <label>Nome:</label>
          <input type="text" />
        </div>

        <div className="textarea-descricao">
          <label>Descrição:</label>
          <textarea />
        </div>

        <div className="checkbox-options">
          <label>Estado do produto:</label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" /> Novo
            </label>
            <label>
              <input type="checkbox" /> Seminovo
            </label>
            <label>
              <input type="checkbox" /> Usado
            </label>
          </div>
        </div>

        <div className="caracteristicas">
          <div className="input-cor">
            <label>Cor:</label>
            <input type="text" />
          </div>
          <div className="input-tamanho">
            <label>Tamanho:</label>
            <input type="text" />
          </div>
        </div>

        <div className="form-group">
          <label>Preço:</label>
          <input type="text" />

          <label>Estampa:</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Anexar Imagem:</label>
          <input type="file" onChange={handleImageUpload} multiple />
        </div>

        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="preview-img"
              />
              <button type="button" onClick={() => removeImage(index)}>
                X
              </button>
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
