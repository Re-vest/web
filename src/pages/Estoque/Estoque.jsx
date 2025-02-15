// src/pages/Estoque.js
import React, { useEffect, useState } from "react";
import estoque from "../../styles/estoque.module.css";
import { Header } from "../../components/Estoque/Header";
import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
import { Acoes } from "../../components/Estoque/Acoes";
import { Navbar } from "../../components/Navbar";
import CadastroProdutoModal from "../../components/ModalProduto";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { NavbarMobile } from "../../components/NavbarMobile";
import { CardProduto } from "../../components/CardProduto";
import PickList from "../../components/picklist";
import Select from "react-select";

export const Estoque = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [desfazer, setDesfazer] = useState([]);
  const [openCarrinho, setOpenCarrinho] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtredOptions, setFiltredOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    categoria: [],
    valor: [],
  });

  const filterOptions = [
    {
      label: "Status",
      options: [
        { label: "Disponível", value: "DISPONIVEL" },
        { label: "Oculto", value: "OCULTO" },
        { label: "Vendido", value: "VENDIDO" },
      ],
    },
    {
      label: "Categoria",
      options: [
        { label: "Roupas", value: "ROUPAS" },
        { label: "Acessórios", value: "ACESSORIOS" },
      ],
    },
    {
      label: "Valor",
      options: [
        { label: "Até R$30,00", value: "ate_30_reais" },
        { label: "Entre R$6 - R$50,00", value: "entre_6_e_50_reais" },
        { label: "Mais de R$100,00", value: "mais_de_100_reais" },
      ],
    },
  ];

  let opcoesCarrinhos = [];

  const navigate = useNavigate();

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

  useEffect(() => {
    if (!sessionStorage.TOKEN || sessionStorage.PERFIL === "CLIENTE") {
      navigate("/login");
    } else {
      try {
        api.get("/produtos").then((response) => {
          response.data.map((product) => {
            product.categoria = opcoesCategoria.find(
              (category) => category.value === product.categoria
            ).label;
            product.tipo = opcoesTipo.find(
              (type) => type.value === product.tipo
            ).label;
          });

          if (response.status !== 204) setProdutos(response.data);
        });

        api.get("/eventos").then((response) => {
          response.data.map((event) => {
            opcoesCarrinhos.push({ label: event.titulo, value: event.id });
          });
          if (response.status !== 204) {
            setEventos(opcoesCarrinhos);
            setEventoSelecionado(opcoesCarrinhos[0]);
          }
          //console.log(eventos);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  useEffect(() => {
    setFiltredOptions(
      produtos.filter((product) => {
        const matchesSearchTerm =
          product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(product.id).toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedFilters.status.length === 0 ||
          selectedFilters.status.includes(product.status);

        const matchesCategoria =
          selectedFilters.categoria.length === 0 ||
          selectedFilters.categoria.includes(product.categoria.toLowerCase());

        const matchesValor =
          selectedFilters.valor.length === 0 ||
          (selectedFilters.valor.includes("ate_30_reais") &&
            product.preco <= 30) ||
          (selectedFilters.valor.includes("entre_6_e_50_reais") &&
            product.preco > 5 &&
            product.preco <= 50) ||
          (selectedFilters.valor.includes("mais_de_100_reais") &&
            product.preco > 100);

        return (
          matchesSearchTerm && matchesStatus && matchesCategoria && matchesValor
        );
      })
    );
  }, [searchTerm, selectedFilters, produtos]);

  const handleFilterChange = (event) => {
    const options = event;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      selectedValues.push(options[i].value);
    }

    const newSelectedFilters = { ...selectedFilters };

    filterOptions.forEach((group) => {
      newSelectedFilters[group.label.toLowerCase()] = selectedValues.filter(
        (value) => group.options.some((option) => option.value === value)
      );
    });

    setSelectedFilters(newSelectedFilters);
  };
  console.log(eventos);

  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="hidden md:flex">
        <Navbar />
      </div>

      <div className="flex md:hidden">
        <NavbarMobile />
      </div>
      <div className={estoque["inventory-container"]}>
        <div className={estoque["header"]}>
          <h2>Controle de Estoque</h2>
        </div>
        <Acoes
          products={produtos}
          setProdutos={setProdutos}
          setSearchTerm={setSearchTerm}
          options={filterOptions}
          handleFilterChange={handleFilterChange}
          onClick={() => {
            setEditar({});
            setModalOpen(true);
          }}
          desfazer={desfazer}
          setDesfazer={setDesfazer}
          setOpenCarrinho={setOpenCarrinho}
        />

        <div className="w-full overflow-x-scroll md:overflow-x-visible">
          <table className={estoque["inventory-table"]}>
            <Header setProdutos={setProdutos} />
            <tbody>
              {filtredOptions.map((product) => (
                <LinhaProduto
                  product={product}
                  key={product.id}
                  id={product.id}
                  nome={product.nome}
                  descricao={product.descricao}
                  preco={product.preco}
                  categoria={product.categoria}
                  status={product.status}
                  editar={setEditar}
                  modalEditar={setModalOpen}
                  setProdutos={setProdutos}
                  produtos={produtos}
                  desfazer={desfazer}
                  setDesfazer={setDesfazer}
                />
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <CadastroProdutoModal
            produtos={produtos}
            editar={editar}
            isOpen={modalOpen}
            setProdutos={setProdutos}
            onClose={() => setModalOpen(false)}
          />
        )}
        <div
          className="absolute bottom-14 right-0 p-5 bg-yellow-500 rounded-full md:hidden"
          onClick={() => {
            setEditar({});
            setModalOpen(true);
          }}
        >
          <Plus size={16} />
        </div>
      </div>

      {openCarrinho && (
        <div className={estoque["carrinho"]}>
          <div className={estoque["produtosCarrinho"]}>
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30}
            />
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30.0}
            />
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30.0}
            />
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30.0}
            />
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30.0}
            />
            <CardProduto
              image={
                "data:image/jpeg;base64,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"
              }
              nome={"Camiseta"}
              preco={30.0}
            />
          </div>
          <div className={estoque["informacaoCarrinho"]}>
            <div className={estoque["eventoCarrinho"]}>
              <span>Evento:</span>
              <div className="w-1/2">
                <Select
                  value={eventoSelecionado}
                  placeholder="Selecionar"
                  onChange={(e) => setEventoSelecionado(e)}
                  options={eventos}
                  styles={{ width: "100%" }}
                />
              </div>
            </div>
            <div className={estoque["valorCarrinho"]}>
              <span>Valor Total:</span>
              <span>R$ 180,00</span>
            </div>
            <div className={estoque["finalCarrinho"]}>
              <Button
                text={"Registrar Venda"}
                onClick={() => setOpenCarrinho(false)}
                secondary
              />
              <Button
                text={"Cancelar"}
                onClick={() => setOpenCarrinho(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
