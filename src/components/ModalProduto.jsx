import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ModalProduto.css"; // Importação do CSS

Modal.setAppElement("#root");

const CadastroProdutoModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);
  const [estadoProduto, setEstadoProduto] = useState("");
  const [preco, setPreco] = useState("");

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

  const handleCheckboxChange = (value) => {
    setEstadoProduto(value); // Atualiza o estado do produto com o valor do checkbox selecionado
  };

  const handlePrecoChange = (event) => {
    const { value } = event.target;
    // Remove caracteres não numéricos, exceto a vírgula
    const formattedValue = value.replace(/[^0-9,]/g, "");
    setPreco(formattedValue);
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
              <option value="roupas-calcados">Calçados</option>
              <option value="roupas-camisas">Camisas</option>
              <option value="roupas-calcas">Calças</option>
              <option value="roupas-blusas">Blusas</option>
              <option value="roupas-vestidos">Vestidos</option>
              <option value="roupas-shorts">Shorts</option>
              <option value="roupas-outros">Outros (Roupas)</option>
              <option value="acessorios-bolsas">Bolsas</option>
              <option value="acessorios-cintos">Cintos</option>
              <option value="acessorios-relogios">Relógios</option>
              <option value="acessorios-oculos-de-sol">Óculos de Sol</option>
              <option value="acessorios-outros">Outros (Acessórios)</option>
            </select>
          </div>

          <div className="select-categoria">
            <label>Categoria:</label>
            <select>
              <option value="roupas">Roupas</option>
              <option value="acessorios">Acessorios</option>
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
              <input
                type="checkbox"
                checked={estadoProduto === "novo"}
                onChange={() => handleCheckboxChange("novo")}
              />
              Novo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "seminovo"}
                onChange={() => handleCheckboxChange("seminovo")}
              />
              Seminovo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "usado"}
                onChange={() => handleCheckboxChange("usado")}
              />
              Usado
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

        <div className="atributos">
          <div className="input-preco">
            <label>Preço:</label>
            <input
              type="text"
              value={preco}
              onChange={handlePrecoChange}
              placeholder="0,00"
              style={{
                textAlign: "left", // Para alinhar o texto à esquerda
                appearance: "none", // Remove o estilo padrão do input
                outline: "none", // Remove o contorno
                border: "none", // Remove a borda, se desejar
              }}
            />
          </div>

          <div className="input-estampa">
            <label>Estampa:</label>
            <input type="text" />
          </div>
        </div>

        <div className="group-status">
          <label>Status:</label>
          <select>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="oculto">Oculto</option>
            <option value="vendido">Vendido</option>
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