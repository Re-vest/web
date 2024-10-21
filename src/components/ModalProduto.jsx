import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ModalProduto.css"; // Importação do CSS
import PickList from "./picklist";
import { Input } from "./Input";
import {Button} from "./Button"

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
        <div className="input-nome">
          <label>Nome:</label>
          <Input placeholder={""} />
        </div>
        <div className="textarea-descricao">
          <label>Descrição:</label>
          <Input placeholder={""} />
        </div>
        <div className="select-options">
          <div className="select-tipo">
            <label>Tipo:</label>
            <PickList />
          </div>
          <div className="select-categoria">
            <label>Categoria:</label>
            <PickList />
          </div>
          <div className="select-status">
          <label>Status</label>
          <PickList />
          </div>
        </div>

        <div className="checkbox-group">
          <label>Estado do produto:</label>
          <div className="checkbox-options">
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
            <Input/>
          </div>
          <div className="input-tamanho">
            <label>Tamanho:</label>
            <Input/>
          </div>
        </div>
        <div className="atributos">
          <div className="input-preco">
            <label>Preço:</label>
            <Input/>
          </div>

          <div className="input-estampa">
            <label>Estampa:</label>
            <Input/>
          </div>
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
          <Button text={"Cancelar"} secondary style={{textAlign:"center"}}/>
          <Button text={"Salvar"}/>
          {/* <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Cadastrar</button> */}
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
