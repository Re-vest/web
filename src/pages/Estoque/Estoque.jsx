// src/pages/Estoque.js
import React, { useEffect, useState } from "react";
import "../../styles/estoque.css";
import { Header } from "../../components/Estoque/Header";
import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
import { Acoes } from "../../components/Estoque/Acoes";
import { Navbar } from "../../components/Navbar";
import CadastroProdutoModal from "../../components/ModalProduto";

export const Estoque = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [produtos, setProdutos] = useState([
    {
      id: "01232555",
      descricao: "Blusa xadrez de manga comprida",
      status: "Disponível",
      quantidade: 4,
      preco: 4.0,
      categoria: "Roupas"
    },
    {
      id: "01232556",
      descricao: "Camisa xadrez de manga comprida",
      status: "Oculto",
      quantidade: 6,
      preco: 18.0,
      categoria: "Roupas"
    },
    {
      id: "01232557",
      descricao: "Calça xadrez de manga comprida",
      status: "Indisponível",
      quantidade: 3,
      preco: 25.0,
      categoria: "Roupas"
    },
    {
      id: "01232587",
      descricao: "Cueca",
      status: "Vendido",
      quantidade: 3,
      preco: 25.0,
      categoria: "Acessórios"
    },
    {
      id: "01232588",
      descricao: "Jaqueta de couro",
      status: "Disponível",
      quantidade: 10,
      preco: 150.0,
      categoria: "Roupas"
    },
    {
      id: "01232589",
      descricao: "Relógio de pulso",
      status: "Vendido",
      quantidade: 0,
      preco: 200.0,
      categoria: "Acessórios"
    },
    {
      id: "01232590",
      descricao: "Boné de aba reta",
      status: "Oculto",
      quantidade: 8,
      preco: 50.0,
      categoria: "Acessórios"
    },
    {
      id: "01232591",
      descricao: "Vestido floral",
      status: "Disponível",
      quantidade: 15,
      preco: 80.0,
      categoria: "Roupas"
    },
    {
      id: "01232592",
      descricao: "Óculos de sol",
      status: "Disponível",
      quantidade: 12,
      preco: 120.0,
      categoria: "Acessórios"
    },
    {
      id: "01232593",
      descricao: "Meia esportiva",
      status: "Indisponível",
      quantidade: 20,
      preco: 15.0,
      categoria: "Acessórios"
    },
    {
      id: "01232594",
      descricao: "Sapato social",
      status: "Disponível",
      quantidade: 5,
      preco: 200.0,
      categoria: "Calçados"
    },
    {
      id: "01232595",
      descricao: "Tênis casual",
      status: "Oculto",
      quantidade: 7,
      preco: 150.0,
      categoria: "Calçados"
    },
    {
      id: "01232596",
      descricao: "Jaqueta jeans",
      status: "Indisponível",
      quantidade: 2,
      preco: 100.0,
      categoria: "Roupas"
    },
    {
      id: "01232597",
      descricao: "Chapéu de palha",
      status: "Disponível",
      quantidade: 9,
      preco: 30.0,
      categoria: "Acessórios"
    },
    {
      id: "01232598",
      descricao: "Bolsa de couro",
      status: "Vendido",
      quantidade: 0,
      preco: 250.0,
      categoria: "Acessórios"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtredOptions, setFiltredOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    quantidade: [],
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
      label: "Quantidade",
      options: [
        { label: "Até 5 itens", value: "ate_5_itens" },
        { label: "Mais de 5 itens", value: "mais_de_5_itens" },
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

  useEffect(() => {
    setFiltredOptions(
      produtos.filter((product) => {
        const matchesSearchTerm =
          product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          selectedFilters.status.length === 0 ||
          selectedFilters.status.includes(product.status);

        const matchesQuantidade =
          selectedFilters.quantidade.length === 0 ||
          (selectedFilters.quantidade.includes("ate_5_itens") &&
            product.quantidade <= 5) ||
          (selectedFilters.quantidade.includes("mais_de_5_itens") &&
            product.quantidade > 5);

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
          matchesQuantidade &&
          matchesCategoria &&
          matchesValor
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

  return (
    <div className="w-full h-full flex">
      <Navbar />
      <div className="inventory-container">
        <div className="header">
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

        <table className="inventory-table">
          <Header />
          <tbody>
            {filtredOptions.map((product) => (
              <LinhaProduto key={product.id} product={product} />
            ))}
          </tbody>
        </table>
        <CadastroProdutoModal
          isOpen={modalOpen}
          setProdutos={setProdutos}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
};
