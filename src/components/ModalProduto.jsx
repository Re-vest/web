import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import modalProduto from "../styles/ModalProduto.module.css"
import PickList from "./picklist";
import { Input } from "./Input";
import { Button } from "./Button";
import api from '../api'

Modal.setAppElement("#root");

function formatPrice(value) {
  // Remove todos os caracteres que não são números
  let newValue = value.replace(/\D/g, "");

  // Adiciona a vírgula para os centavos e ponto para milhares
  newValue = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(newValue) / 100);

  return newValue;
}

function parseFormattedPrice(value) {
  // Remove pontos de milhar e substitui a vírgula decimal por ponto
  let parsedValue = value.replace(/\./g, '').replace(',', '.');

  // Converte para double (ou seja, número em ponto flutuante)
  return parseFloat(parsedValue);
}


const CadastroProdutoModal = ({ isOpen, onClose, setProdutos, editar, produtos }) => {
  const [nome, setNome] = useState(editar.nome);
  const [descricao, setDescricao] = useState(editar.descricao);
  const [tipo, setTipo] = useState(editar.categoria);
  const [categoria, setCategoria] = useState(editar.tipo);
  const [status, setStatus] = useState(editar.status);
  const [cor, setCor] = useState(editar.cor);
  const [tamanho, setTamanho] = useState(editar.tamanho);
  const [finalidade, setFinalidade] = useState(editar.finalidade);
  const [images, setImages] = useState([]);
  const [estadoProduto, setEstadoProduto] = useState(editar.estado ? editar.estado === 'Semi novo' ? 'SEMI_NOVO' : editar.estado.toUpperCase() : '');
  const [preco, setPreco] = useState(editar.preco ? String(editar.preco) : '0');

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  
  
  async function handleSubmit(event) {
    event.preventDefault(); // Evitar o recarregamento da página

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !descricao || !tipo || !categoria || !status || !cor || !tamanho || !estadoProduto || !preco || !finalidade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return; // Retorna imediatamente se os campos não estiverem preenchidos
    }

    // Lógica de criação ou atualização do produto
    if (!editar.id) {
      const newProduct = {
        nome,
        preco: parseFormattedPrice(preco),
        descricao,
        cor,
        finalidade,
        categoria: tipo,
        estado: estadoProduto,
        tipo: categoria,
        status,
        tamanho,
        // images
      }

      try {

        const response = await api.post('/produtos', newProduct)

        setProdutos(prev => [...prev, response.data]);
      } catch (e) {
        console.log(e)
      }

    } else {
      const updateProduct = {
        nome,
        preco: parseFormattedPrice(preco),
        descricao,
        cor,
        finalidade,
        categoria: tipo.toUpperCase(),
        estado: estadoProduto,
        tipo: categoria,
        status,
        tamanho,
        // images
      };

      console.log(updateProduct)

      try {
        if(status === 'VENDIDO') {
          await api.post("/vendas", {
            produtosId: [editar.id],
            idVendedor: sessionStorage.ID_USER
          })
        }

        const response = await api.put(`/produtos/${editar.id}`, updateProduct)
  
        const productsUpdated = produtos.map(eventProps => {
          if (eventProps.id === response.data.id) {
            return response.data;
          } else return eventProps;
        });

  
        setProdutos(productsUpdated);
      } catch(e) {
        console.log(e);
        
      }

    }

    onClose(); // Fecha o modal após salvar
  }

  const handleCheckboxChange = (value) => {
    setEstadoProduto(value);
  };

  const handlePrecoChange = (event) => {
    const value = event;
    const formattedValue = formatPrice(value);
    setPreco(formattedValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Produto"
      className={modalProduto["modal"]}
      overlayClassName={modalProduto['modal-overlay']}
      shouldCloseOnOverlayClick={false}
    >
      <h2>Controle de Estoque › Adicionar Produto</h2>
      <form className={modalProduto["formulario"]} onSubmit={handleSubmit}>
        <div className={modalProduto["input-nome"]}>
          <label>Nome:</label>
          <Input value={nome} placeholder={""} onChange={setNome} />
        </div>
        <div className={modalProduto["textarea-descricao"]}>
          <label>Descrição:</label>
          <Input value={descricao} placeholder={""} onChange={setDescricao} />
        </div>
        <div className={modalProduto["select-options"]}>
          <div className={modalProduto["select-tipo"]}>
            <label>Tipo:</label>
            <PickList
              options={[
                { label: "Calçados", value: "CALCADO" },
                { label: "Camisas", value: "CAMISETA" },
                { label: "Calças", value: "CALCA" },
                { label: "Blusas", value: "BLUSA" },
                { label: "Vestidos", value: "VESTIDO" },
                { label: "Shorts", value: "SHORTS" },
                { label: "Bolsas", value: "BOLSA" },
                { label: "Cintos", value: "CINTO" },
                { label: "Relógios", value: "RELOGIO" },
                { label: "Óculos", value: "OCULOS" },
                { label: "Outros", value: "OUTRO" },
              ]}
              onChange={setTipo}
              value={tipo}
            />
          </div>
          <div className={modalProduto["select-categoria"]}>
            <label>Categoria:</label>
            <PickList
              options={[
                { label: "Roupa", value: "Roupa" },
                { label: "Acessório", value: "Acessorio" },
              ]}
              onChange={setCategoria}
              value={categoria}
            />
          </div>
          <div className={modalProduto["select-status"]}>
            <label>Status:</label>
            <PickList
              options={[
                { label: "Disponível", value: "DISPONIVEL" },
                { label: "Oculto", value: "OCULTO" },
                { label: "Vendido", value: "VENDIDO" },
              ]}
              onChange={setStatus}
              value={status}
            />
          </div>
        </div>

        <div className={modalProduto["checkbox-group"]}>
          <label>Estado do produto:</label>
          <div className={modalProduto["checkbox-options"]}>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "NOVO" || editar.estado === 'NOVO'}
                onChange={() => handleCheckboxChange("NOVO")}
              />
              Novo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "SEMI_NOVO" || editar.estado === 'SEMI_NOVO'}
                onChange={() => handleCheckboxChange("SEMI_NOVO")}
              />
              Seminovo
            </label>
            <label>
              <input
                type="checkbox"
                checked={estadoProduto === "USADO" || editar.estado === 'USADO'}
                onChange={() => handleCheckboxChange("USADO")}
              />
              Usado
            </label>
          </div>
        </div>
        <div className={modalProduto["caracteristicas"]}>
          <div className={modalProduto["input-cor"]}>
            <label>Cor:</label>
            <Input value={cor} onChange={setCor} />
          </div>
          <div className={modalProduto["input-tamanho"]}>
            <label>Tamanho:</label>
            <Input value={tamanho} onChange={setTamanho} />
          </div>
        </div>
        <div className={modalProduto["atributos"]}>
          <div className={modalProduto["input-preco"]}>
            <label>Preço:</label>
            <Input
              value={preco}
              onChange={handlePrecoChange}
              placeholder="0,00"
              maxLength={6}
              required
            />
          </div>

          <div className={modalProduto["input-estampa"]}>
            <label>Finalidade:</label>
            <Input value={finalidade} onChange={setFinalidade} />
          </div>
        </div>
        <div className={modalProduto["form-group"]}>
          <label>Anexar Imagem:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            multiple
          />
        </div>
        <div className={modalProduto["image-preview"]}>
          {images.map((image, index) => (
            <div key={index} className={modalProduto["image-container"]}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index}`}
                className={modalProduto["preview-img"]}
              />
              <button type="button" onClick={() => removeImage(index)}>
                X
              </button>
            </div>
          ))}
        </div>
        <div className={modalProduto["form-actions"]}>
          <Button text={"Cancelar"} onClick={onClose} secondary style={{ textAlign: "center" }} />
          <Button text={"Salvar"} onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
