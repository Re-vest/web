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
import Select from "react-select";
import notFound from "../../assets/notFound.png";

export const Estoque = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
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
  
  const [totalCarrinho, setTotalCarrinho] = useState(0)
  console.log(produtosSelecionados);

  useEffect(() => {
      setTotalCarrinho(produtosSelecionados.reduce((acc, produtoAtual) => acc + produtoAtual.preco, 0))
  }, [produtosSelecionados])

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
                  produtosSelecionados={produtosSelecionados}
                  setProdutosSelecionados={setProdutosSelecionados}
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
            {produtosSelecionados.map((product) => (
              <CardProduto
                key={product.id}
                image={product.imagem ? product.imagem.urlImagem : notFound}
                nome={product.nome}
                preco={product.preco.toFixed(2)}
              />
            ))}
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
              <span>R$ {totalCarrinho.toFixed(2)}</span>
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
