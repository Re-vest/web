import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../styles/ModalProduto.css";
import PickList from "./picklist";
import { Input } from "./Input";
import { Button } from "./Button";

Modal.setAppElement("#root");

const CadastroProdutoModal = ({ isOpen, onClose, setProdutos, editar, produtos }) => {
  const [nome, setNome] = useState(editar.nome);
  const [descricao, setDescricao] = useState(editar.descricao);
  const [tipo, setTipo] = useState(editar.tipo);
  const [categoria, setCategoria] = useState(editar.categoria);
  const [status, setStatus] = useState(editar.status);
  const [cor, setCor] = useState(editar.cor);
  const [tamanho, setTamanho] = useState(editar.tamanho);
  const [estampa, setEstampa] = useState(editar.estampa);
  const [images, setImages] = useState([]);
  const [estadoProduto, setEstadoProduto] = useState(editar.estadoProduto);
  const [preco, setPreco] = useState(editar.preco);
  

  //Testar isso depois
  //onsole.log(preco)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  function handleSubmit(event) {
    if (!nome || !descricao || !tipo || !categoria || !status || !cor || !tamanho || !estadoProduto || !preco || !estampa) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    event.preventDefault()
    if(!editar.id) {
      const newProduct = {
        id: String(Math.random()),
        nome,
        descricao,
        tipo,
        categoria,
        status,
        estadoProduto,
        cor,
        tamanho,
        preco,
        estampa,
        images
      }
  
      // newEvents.dataInicio.setHours(0)
      // newEvents.dataFim.setHours(0)
      // newEvents.dataInicio.setDate(newEvents.dataInicio.getDate() + 1)
      // newEvents.dataFim.setDate(newEvents.dataFim.getDate() + 1)
      setProdutos(prev => [...prev, newProduct])
      
      
    } else {
      const updateProduct = {
        id: editar.id,
        nome,
        descricao,
        tipo,
        categoria,
        status,
        estadoProduto,
        cor,
        tamanho,
        preco,
        estampa,
        images
      }

      const productsUpdated = produtos.map(eventProps => {
        if (eventProps === editar) {
          return updateProduct
        }
        else return eventProps
      })

      setProdutos(productsUpdated)
    }

    onClose();
  }


  const handleCheckboxChange = (value) => {
    setEstadoProduto(value);
  };

  const handlePrecoChange = (event) => {
    const value = event;
    const formattedValue = value.replace(/[^0-9,.]/g, "");
    setPreco(formattedValue);
  };

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
          <Input value={nome} placeholder={""} onChange={setNome} />
        </div>
        <div className="textarea-descricao">
          <label>Descrição:</label>
          <Input value={descricao} placeholder={""} onChange={setDescricao} />
        </div>
        <div className="select-options">
          <div className="select-tipo">
            <label>Tipo:</label>
            <PickList
              options={[
                { label: "Calçados", value: "calçados" },
                { label: "Camisas", value: "camisas" },
                { label: "Calças", value: "calças" },
                { label: "Blusas", value: "blusas" },
                { label: "Vestidos", value: "vestidos" },
                { label: "Shorts", value: "shorts" },
                { label: "Outros (Roupas)", value: "outros-roupas" },
                { label: "Bolsas", value: "bolsas" },
                { label: "Cintos", value: "cintos" },
                { label: "Relógios", value: "relogios" },
                { label: "Óculos de Sol", value: "oculos-de-sol" },
                { label: "Outros (Acessórios)", value: "outros-acessorios" },
              ]}
              onChange={setTipo}
              value={tipo}
            />
          </div>
          <div className="select-categoria">
            <label>Categoria:</label>
            <PickList
              options={[
                { label: "Roupas", value: "Roupas" },
                { label: "Acessórios", value: "acessorios" },
              ]}
              onChange={setCategoria}
              value={categoria}
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
              value={status}
            />
          </div>
        </div>

        <div className="checkbox-group">
          <label>Estado do produto:</label>
          <div className="checkbox-options">
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "Novo" || editar.estado === 'Novo'}
                onChange={() => handleCheckboxChange("Novo")}
              />
              Novo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "Seminovo" || editar.estado === 'Seminovo'}
                onChange={() => handleCheckboxChange("Seminovo")}
              />
              Seminovo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "Usado" || editar.estado === 'Usado'}
                onChange={() => handleCheckboxChange("Usado")}
              />
              Usado
            </label>
          </div>
        </div>
        <div className="caracteristicas">
          <div className="input-cor">
            <label>Cor:</label>
            <Input value={cor} onChange={setCor} />
          </div>
          <div className="input-tamanho">
            <label>Tamanho:</label>
            <Input value={tamanho} onChange={setTamanho} />
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
            <Input value={estampa} onChange={setEstampa} />
          </div>
        </div>
        <div className="form-group">
          <label>Anexar Imagem:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            value={images}
            multiple
          />
        </div>
        <div className="image-preview">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className="preview-img"
                value={images}
              />
              <button type="button" onClick={() => removeImage(index)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div className="form-actions">
          <Button text={"Cancelar"} onClick={onClose} secondary style={{ textAlign: "center" }} />
          <Button text={"Salvar"} onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
