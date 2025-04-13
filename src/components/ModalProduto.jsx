import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import modalProduto from "../styles/ModalProduto.module.css";
import PickList from "./picklist";
import { Input } from "./Input";
import { Button } from "./Button";
import api from "../api";
import FormData from "form-data";
import { UserContext } from "../Contexts/UserContext";

Modal.setAppElement("#root");

function formatPrice(value) {
  // Remove todos os caracteres que não são números
  let newValue = value.replace(/\D/g, "");

  // Adiciona a vírgula para os centavos e ponto para milhares
  newValue = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(newValue) / 100);

  return newValue;
}

function parseFormattedPrice(value) {
  // Remove pontos de milhar e substitui a vírgula decimal por ponto
  let parsedValue = value.replace(",", ".");

  // Converte para double (ou seja, número em ponto flutuante)
  return parseFloat(parsedValue).toFixed(2);
}

const CadastroProdutoModal = ({
  isOpen,
  onClose,
  setProdutos,
  editar,
  produtos,
}) => {

  const opcoesStatus = [
    { label: "Disponível", value: "DISPONIVEL" },
    { label: "Oculto", value: "OCULTO" }
  ];

  const { user, setUser } = useContext(UserContext)

  const [nome, setNome] = useState(editar.nome);
  const [descricao, setDescricao] = useState(editar.descricao ? editar.descricao : "");
  const [tipo, setTipo] = useState(editar.tipo);
  const [categoria, setCategoria] = useState(editar.categoria);
  const [status, setStatus] = useState(editar.status ? opcoesStatus.find(status => status.value === editar.status).label : "");
  const [cor, setCor] = useState(editar.cor);
  const [tamanho, setTamanho] = useState(editar.tamanho);
  const [finalidade, setFinalidade] = useState(editar.finalidade);
  const [images, setImages] = useState(
    editar.imagem ? editar.imagem.urlImagem : null
  );
  const [condicaoProduto, setCondicaoProduto] = useState(
    editar.condicao ? editar.condicao : ""
  );
  const [preco, setPreco] = useState(editar.preco ? String(editar.preco) : "0");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (event) => {
    setImages(event.target.files[0]);
  };

  const removeImage = () => {
    setImages(null);
  };

  const opcoesTipo = [
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
  ];
  const opcoesCategoria = [
    { label: "Roupa", value: "ROUPA" },
    { label: "Acessório", value: "ACESSORIO" },
  ];
  

  async function handleSubmit(event) {
    event.preventDefault(); // Evitar o recarregamento da página

    if (isSubmitting) return; // Impede múltiplos cliques

    setIsSubmitting(true);

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !nome ||
      !tipo ||
      !categoria ||
      !status ||
      !cor ||
      !tamanho ||
      !condicaoProduto ||
      !preco
    ) {
      swal("Erro", "Preencha todos os campos obrigatórios", "error");
      return;
    }

    var valorTipo = opcoesTipo.find(
      (opcaoTipo) => opcaoTipo.label === tipo || opcaoTipo.value === tipo
    ).value;
    var valorStatus = opcoesStatus.find(
      (opcao) => opcao.label === status || opcao.value == status
    ).value;
    var valorCategoria = opcoesCategoria.find(
      (opcao) => opcao.label === categoria || opcao.value === categoria
    ).value;

    // Lógica de criação ou atualização do produto
    if (!editar.id) {
      const newProduct = {
        nome,
        preco: parseFormattedPrice(preco),
        descricao,
        cor,
        categoria: valorCategoria,
        condicao: condicaoProduto,
        tipo: valorTipo,
        status: valorStatus,
        tamanho
      };
      swal("Sucesso", "Produto cadastrado com sucesso", "success");
      
      const formData = new FormData();
      formData.append(
        "produto",
        new Blob([JSON.stringify(newProduct)], {
          type: "application/json",
        })
      );
      formData.append("arquivo", images);

      try {
        const response = await api.post(
          `/produtos?idUsuario=${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          response.data.categoria = opcoesCategoria.find(
            (category) => category.value === newProduct.categoria
          ).label;
          response.data.tipo = opcoesTipo.find(
            (type) => type.value === newProduct.tipo
          ).label;
          setProdutos((prev) => [...prev, response.data]);
        } 
      } catch (e) {
        console.log(e);
      }
    } else {

      const updateProduct = {
        nome,
        preco: parseFormattedPrice(preco),
        descricao,
        cor,
        tamanho,
        tipo: valorTipo,
        condicao: condicaoProduto,
        status: valorStatus,
        categoria: valorCategoria,
      };

      swal("Sucesso", "Produto atualizado com sucesso", "success");

      try{
        const formData = new FormData();
        formData.append(
          "produto",
          new Blob([JSON.stringify(updateProduct)], {
            type: "application/json",
          })
        );
        formData.append('arquivo', images)

        const response = await api.put(
          `/produtos/${editar.id}?idUsuario=${user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produto.id === response.data.id
              ? {
                  ...response.data,
                  tipo: opcoesTipo.find((opcao) => opcao.value === response.data.tipo)
                    ?.label,
                  categoria: opcoesCategoria.find(
                    (opcao) => opcao.value === response.data.categoria
                  )?.label,
                  status: opcoesStatus.find((opcao) => opcao.value === response.data.status)
                    ?.value,
                }
              : produto
          )
        );  
        
        setProdutos(productsUpdated);
      } catch (e) {
        console.log(e);
      }
    }
    setIsSubmitting(false);
    onClose(); // Fecha o modal após salvar
  }

  const handleCheckboxChange = (value) => {
    setCondicaoProduto(value);
  };

  const handlePrecoChange = (event) => {
    const value = event;
    const formattedValue = formatPrice(value);
    setPreco(formattedValue);
  };

  const Image = () => {
    return (
      <div className={modalProduto["image-container"]}>
        <img
          src={images.size ? URL.createObjectURL(images) : images}
          alt={`Preview`}
          className={modalProduto["preview-img"]}
        />
        <button type="button" onClick={removeImage}>
          X
        </button>
      </div>
    );
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Produto"
      className={modalProduto["modal"]}
      overlayClassName={modalProduto["modal-overlay"]}
      shouldCloseOnOverlayClick={false}
    >
      <div className="hidden md:flex">
        <h2>Controle de Estoque › Adicionar Produto</h2>
      </div>
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
          <div className="w-full md:w-[66%] flex gap-1">
            <div className={modalProduto["select-tipo"]}>
              <label>Tipo:</label>
              <PickList options={opcoesTipo} onChange={setTipo} value={tipo} />
            </div>
            <div className={modalProduto["select-categoria"]}>
              <label>Categoria:</label>
              <PickList
                options={opcoesCategoria}
                onChange={setCategoria}
                value={categoria}
              />
            </div>
          </div>
          <div className={modalProduto["select-status"]}>
            <label>Status:</label>
            <PickList
              options={opcoesStatus}
              onChange={setStatus}
              value={status}
            />
          </div>
        </div>

        <div className={modalProduto["checkbox-group"]}>
          <label>Condicao do produto:</label>
          <div className={modalProduto["checkbox-options"]}>
            <label>
              <input
                type="checkbox"
                checked={condicaoProduto === "NOVO"}
                onChange={() => handleCheckboxChange("NOVO")}
              />
              Novo
            </label>
            <label>
              <input
                type="checkbox"
                checked={condicaoProduto === "SEMI_NOVO"}
                onChange={() => handleCheckboxChange("SEMI_NOVO")}
              />
              Seminovo
            </label>
            <label>
              <input
                type="checkbox"
                checked={condicaoProduto === "USADO"}
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
          <div className={modalProduto["form-group"]}>
            <label>Anexar Imagem:</label>
            <input type="file" onChange={handleImageUpload} />
          </div>
        </div>
        <div className={modalProduto["image-preview"]}>
          {images && <Image />}
        </div>
        <div className={modalProduto["form-actions"]}>
          <Button
            text={"Cancelar"}
            onClick={onClose}
            secondary
            style={{ textAlign: "center" }}
          />
          <Button text={"Salvar"} onClick={handleSubmit} />
        </div>
      </form>
    </Modal>
  );
};

export default CadastroProdutoModal;
