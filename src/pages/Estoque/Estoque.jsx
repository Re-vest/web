// src/pages/Estoque.js
import React, { useEffect, useState } from "react";
import estoque from "../../styles/estoque.module.css";
import { Header } from "../../components/Estoque/Header";
import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
import { Acoes } from "../../components/Estoque/Acoes";
import { Navbar } from "../../components/Navbar";
import CadastroProdutoModal from "../../components/ModalProduto";
import { useNavigate } from "react-router-dom";
import api from '../../api'

export const Estoque = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [produtos, setProdutos] = useState([
    // {
    //   id: "01232555",
    //   nome: "Macacão Baby",
    //   descricao: "Blusa xadrez de manga comprida",
    //   tipo: "Camisas",
    //   categoria: "Roupas",
    //   status: "Disponível",
    //   estadoProduto: "Novo",
    //   cor: "Vermelho",
    //   tamanho: "3",
    //   preco: 4.0,
    //   estampa: "Lisa",
    //   images: "",
    // },
  ]);

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
        { label: "Disponível", value: "Disponível" },
        { label: "Oculto", value: "Oculto" },
        { label: "Indisponível", value: "Indisponível" },
        { label: "Vendido", value: "Vendido" },
      ],
    },
    {
      label: "Categoria",
      options: [
        { label: "Roupas", value: "roupas" },
        { label: "Acessórios", value: "acessórios" },
      ],
    },
    {
      label: "Valor",
      options: [
        { label: "Até R$5,00", value: "ate_5_reais" },
        { label: "Entre R$6 - R$20,00", value: "entre_6_e_20_reais" },
        { label: "Mais de R$21,00", value: "mais_de_21_reais" },
      ],
    },
  ];

  const navigate = useNavigate()

  useEffect(() => {
    if(!sessionStorage.TOKEN) {
      navigate('/login')
    } else {

      try {
        api.get("/produtos").then(response => {
          setProdutos(response.data)
        })
      } catch(e) {
        console.log(e)
      }

      console.log(produtos)

      setFiltredOptions(
        produtos.filter((product) => {
          const matchesSearchTerm =
            product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase());
  
          const matchesStatus =
            selectedFilters.status.length === 0 ||
            selectedFilters.status.includes(product.status);
  
  
          const matchesCategoria =
            selectedFilters.categoria.length === 0 ||
            selectedFilters.categoria.includes(product.categoria.toLowerCase());
  
          const matchesValor =
            selectedFilters.valor.length === 0 ||
            (selectedFilters.valor.includes("ate_5_reais") &&
              product.preco <= 5) ||
            (selectedFilters.valor.includes("entre_6_e_20_reais") &&
              product.preco > 5 &&
              product.preco <= 20) ||
            (selectedFilters.valor.includes("mais_de_21_reais") &&
              product.preco > 21);
  
          return (
            matchesSearchTerm &&
            matchesStatus &&
            matchesCategoria &&
            matchesValor
          );
        })
      );
    }
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

  return (
    <div className="w-full h-full flex">
      <Navbar />
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
          onClick={() => setModalOpen(true)}
        />

        <table className={estoque["inventory-table"]}>
          <Header />
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
              />
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <CadastroProdutoModal
            produtos={produtos}
            editar={editar}
            isOpen={modalOpen}
            setProdutos={setProdutos}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
