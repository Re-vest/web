import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/ModalProduto.css";
import PickList from "./picklist";
import { Input } from "./Input";
import { Button } from "./Button";

Modal.setAppElement("#root");

const CadastroProdutoModal = ({ isOpen, onClose, setProdutos }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("");
  const [cor, setCor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [estampa, setEstampa] = useState("");
  const [images, setImages] = useState([]);
  const [estadoProduto, setEstadoProduto] = useState("");
  const [preco, setPreco] = useState("");

  //Testar isso depois
  //onsole.log(preco)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveProduto();
    // console.log("Produto cadastrado");
    onClose();
  };

  const handleCheckboxChange = (value) => {
    setEstadoProduto(value);
  };

  const handlePrecoChange = (event) => {
    const value = event;
    const formattedValue = value.replace(/[^0-9,.]/g, "");
    setPreco(formattedValue);
  };

  function saveProduto() {
    console.log(2)
    console.log(preco)
    let Produto = {
      id: "2021515",
      nome: nome,
      descricao: descricao,
      tipo: tipo,
      categoria: categoria,
      status: status,
      cor: cor,
      tamanho: tamanho,
      estampa: estampa,
      images: images,
      estadoProduto: estadoProduto,
      preco: Number(preco),
    };
    setProdutos((produtos) => [...produtos, Produto]);
    console.log(Produto);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Produto"
      className="modal"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={false}
    >
      <h2>Controle de Estoque › Adicionar Produto</h2>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="input-nome">
          <label>Nome:</label>
          <Input placeholder={""} onChange={setNome} />
        </div>
        <div className="textarea-descricao">
          <label>Descrição:</label>
          <Input placeholder={""} onChange={setDescricao} />
        </div>
        <div className="select-options">
          <div className="select-tipo">
            <label>Tipo:</label>
            <PickList
              options={[
                { label: "Roupas", value: "roupas" },
                { label: "Acessórios", value: "acessorios" },
              ]}
              onChange={setTipo}
            />
          </div>
          <div className="select-categoria">
            <label>Categoria:</label>
            <PickList
              options={[
                { label: "Calçados", value: "Roupas" },
                { label: "Camisas", value: "Roupas" },
                { label: "Calças", value: "Roupas" },
                { label: "Blusas", value: "Roupas" }, 
                { label: "Vestidos", value: "Roupas" },
                { label: "Shorts", value: "Roupas" },
                { label: "Outros (Roupas)", value: "Roupas" },
                { label: "Bolsas", value: "Acessórios" },
                { label: "Cintos", value: "Acessórios" },
                { label: "Relógios", value: "Acessórios" },
                { label: "Óculos de Sol", value: "Acessórios" },
                { label: "Outros (Acessórios)", value: "Acessórios" },
              ]}
              onChange={setCategoria}
            />
          </div>
          <div className="select-status">
            <label>Status</label>
            <PickList
              options={[
                { label: "Disponível", value: "Disponível" },
                { label: "Indisponível", value: "Indisponível" },
                { label: "Oculto", value: "Oculto" },
                { label: "Vendido", value: "Vendido" },
              ]}
              onChange={setStatus}
            />
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
            <Input onChange={setCor} />
          </div>
          <div className="input-tamanho">
            <label>Tamanho:</label>
            <Input onChange={setTamanho} />
          </div>
        </div>
        <div className="atributos">
          <div className="input-preco">
            <label>Preço:</label>
            <Input
              type="number"
              value={preco}
              onChange={handlePrecoChange}
              placeholder="0,00"
              maxLength={0}
              required
            />
          </div>

          <div className="input-estampa">
            <label>Estampa:</label>
            <Input onChange={setEstampa} />
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
          <Button text={"Cancelar"} secondary style={{ textAlign: "center" }} />
          <Button text={"Salvar"} onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
