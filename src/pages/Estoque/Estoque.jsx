// src/pages/Estoque.js
import swal from "sweetalert";
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
import { NavbarMobile } from "../../components/NavbarMobile";
import { Carrinho } from "../../components/Carrinho";

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
        { label: "Roupa", value: "ROUPA" },
        { label: "Acessório", value: "ACESSORIO" },
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
          product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(product.id).toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedFilters.status.length === 0 ||
          selectedFilters.status.includes(product.status);

        const matchesCategoria =
          selectedFilters.categoria.length === 0 ||
          selectedFilters.categoria.includes(opcoesCategoria.filter(cat => product.categoria === cat.label)[0].value);

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

  const [totalCarrinho, setTotalCarrinho] = useState(0);
  console.log(produtosSelecionados);

  useEffect(() => {
    setTotalCarrinho(
      produtosSelecionados.reduce(
        (acc, produtoAtual) => acc + produtoAtual.preco,
        0
      )
    );
  }, [produtosSelecionados]);

  const realizarVenda = async () => {
    if (produtosSelecionados.length === 0) {
      swal(
        "Erro",
        "Selecione ao menos um produto para realizar a venda",
        "error",
        {
          timer: 1000,
          button: {
            visible: false,
          },
        }
      );
      return;
    }

    try {
      const response = await api.post(
        `/vendas?idUsuario=${sessionStorage.ID_USER}`,
        {
          produtosId: produtosSelecionados.map((produto) => produto.id),
          idEvento: eventoSelecionado.value,
          idVendedor: sessionStorage.ID_USER,
        }
      );

      if (response.status === 200) {
        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produtosSelecionados.some((p) => p.id === produto.id)
              ? { ...produto, status: "VENDIDO" }
              : produto
          )
        );

        setProdutosSelecionados([]);
        setOpenCarrinho(false);

        swal(
          "Venda Confirmada",
          "Você realizou uma venda com sucesso!",
          "success",
          {
            timer: 1500,
            button: {
              visible: false,
            },
          }
        );
      }
    } catch (error) {
      swal(
        "Erro",
        "Ocorreu um erro ao realizar a venda, selecione um evento",
        "error",
        {
          timer: 1500,
          button: {
            visible: false,
          },
        }
      );
    }
  };

  const cancelarVenda = () => {
    setProdutosSelecionados([]);
    setOpenCarrinho(false);
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => ({
        ...produto,
        checked: false,
      }))
    );
  };

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

        <div className="w-full overflow-x-scroll md:overflow-x-visible overflow-y-scroll">
          <table className={estoque["inventory-table"]}>
            <Header setProdutos={setProdutos} />
            <tbody>
              {[...filtredOptions]
                .sort((a, b) => {
                  if (a.status === "VENDIDO" && b.status !== "VENDIDO")
                    return 1;
                  if (a.status !== "VENDIDO" && b.status === "VENDIDO")
                    return -1;
                  return 0;
                })
                .map((product) => (
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
        <Carrinho
          produtosSelecionados={produtosSelecionados}
          setProdutos={setProdutos}
          setProdutosSelecionados={setProdutosSelecionados}
          setOpenCarrinho={setOpenCarrinho}
        />
      )}
    </div>
  );
};
