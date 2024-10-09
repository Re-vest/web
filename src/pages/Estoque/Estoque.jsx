import React, { useEffect, useState } from "react";
import "../../styles/estoque.css";
import { Header } from "../../components/Estoque/Header";
import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
import { Acoes } from "../../components/Estoque/Acoes";
import { Navbar } from "../../components/Navbar";

export const Estoque = () => {
  const [produtos, setProdutos] = useState([
    {
      id: "01232555",
      descricao: "Blusa xadrez de manga comprida",
      status: "Disponível",
      quantidade: 4,
      preco: 4.0,
      categoria: "Roupas",
      selecionado: false,
    },
    {
      id: "01232556",
      descricao: "Camisa xadrez de manga comprida",
      status: "Oculto",
      quantidade: 6,
      preco: 18.0,
      categoria: "Roupas",
      selecionado: false,
    },
    {
      id: "01232557",
      descricao: "Calça xadrez de manga comprida",
      status: "Indisponível",
      quantidade: 3,
      preco: 25.0,
      categoria: "Roupas",
      selecionado: false,
    },
    {
      id: "01232587",
      descricao: "Cueca",
      status: "Vendido",
      quantidade: 3,
      preco: 25.0,
      categoria: "Acessórios",
      selecionado: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtredOptions, setFiltredOptions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    quantidade: [],
    tipo: [],
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

  const applyFilters = () => {
    return produtos.filter((produto) => {
      const matchesSearchTerm =
        produto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(produto.status);

      const matchesQuantidade =
        selectedFilters.quantidade.length === 0 ||
        (selectedFilters.quantidade.includes("ate_5_itens") && produto.quantidade <= 5) ||
        (selectedFilters.quantidade.includes("mais_de_5_itens") && produto.quantidade > 5);

      const matchesTipo =
        selectedFilters.tipo.length === 0 ||
        selectedFilters.tipo.includes(produto.categoria.toLowerCase());

      const matchesValor =
        selectedFilters.valor.length === 0 ||
        (selectedFilters.valor.includes("ate_5_reais") && produto.preco <= 5) ||
        (selectedFilters.valor.includes("entre_6_e_20_reais") && produto.preco > 5 && produto.preco <= 20) ||
        (selectedFilters.valor.includes("mais_de_21_reais") && produto.preco > 21);

      return matchesSearchTerm && matchesStatus && matchesQuantidade && matchesTipo && matchesValor;
    });
  };

  useEffect(() => {
    setFiltredOptions(applyFilters());
  }, [searchTerm, selectedFilters, produtos]);

  const handleFilterChange = (event) => {
    const options = event;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      selectedValues.push(options[i].value);
    }

    // Atualizar filtros selecionados
    setSelectedFilters((prev) => ({
      ...prev,
      status: selectedValues, // Atualizar o status ou outros filtros conforme necessário
    }));

    // Atualizar as opções filtradas
    setFiltredOptions(applyFilters());
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
      />

      {/* Tabela de produtos */}
      <table className="inventory-table">
        <Header
          selecionaTodos={(e) =>
            setProdutos((prev) =>
              prev.map((p) => ({ ...p, selecionado: e.target.checked }))
            )
          }
        />
        <tbody>
          {filtredOptions.map((product) => (
            <LinhaProduto
              key={product.id}
              product={product}
              selecionaProduto={(id) =>
                setProdutos((prev) =>
                  prev.map((p) =>
                    p.id === id ? { ...p, selecionado: !p.selecionado } : p
                  )
                )
              }
            />
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
