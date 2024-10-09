// src/pages/Estoque.js
import React, { useEffect, useState } from "react";
import "../../styles/estoque.css";
import { Header } from "../../components/Estoque/Header";
import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
import { Acoes } from "../../components/Estoque/Acoes";

export const Estoque = () => {
  const [produtos, setProdutos] = useState([
    {
      id: "01232555",
      descricao: "Blusa xadrez de manga comprida",
      status: "Disponível",
      quantidade: 4,
      preco: 7.0,
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
    // Adicione mais produtos conforme necessário
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filtredOptions, setFiltredOptions] = useState([])
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
      label: "Tipo",
      options: [
        { label: "Roupas", value: "roupas" },
        { label: "Acessórios", value: "acessorios" },
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
    setFiltredOptions(produtos.filter((product) => {
      const matchesSearchTerm =
        product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase());
  
      
  
      return matchesSearchTerm 
    }))

  }, [searchTerm])

  let filteredOptions = []

  // Função para atualizar os filtros

  const handleFilterChange = (event) => {
    const options = event;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
        selectedValues.push(options[i].value);
    }
    console.log(selectedValues)
    filteredOptions = filterOptions.map(group => ({
      ...group,
      options: group.options.filter(option => selectedValues.includes(option.value)),
    })).filter(group => group.options.length > 0)

    const filteredStatusValues = filteredOptions[0].options.map(option => option.value)
    console.log(filteredStatusValues)

    
    setFiltredOptions(produtos.filter(produto => {
      const matchesStatus =
          filteredStatusValues.length === 0 ||
          filteredStatusValues.includes(produto.status);
    
        const matchesQuantidade =
          filteredStatusValues.length === 0 ||
          (filteredStatusValues.includes("ate_5_itens") && produto.quantidade <= 5) ||
          (filteredStatusValues.includes("mais_de_5_itens") && produto.quantidade > 5);
    
        const matchesTipo =
          filteredStatusValues.length === 0 || filteredStatusValues.includes(produto.categoria);
    
        const matchesValor =
          filteredStatusValues.length === 0 ||
          (filteredStatusValues.includes("ate_5_reais") && produto.preco <= 5) ||
          (filteredStatusValues.includes("entre_6_e_20_reais") && produto.preco > 5 && produto.preco <= 20) ||
          (filteredStatusValues.includes("mais_de_21_reais") && produto.preco > 21);
      return filteredStatusValues.includes(produto.status) || matchesStatus || matchesQuantidade || matchesTipo || matchesValor;
    }))
  };

  return (
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
              prev.map(p => ({ ...p, selecionado: e.target.checked }))
            )
          } 
        />
        <tbody>
          {filtredOptions.map((product) => (
            <LinhaProduto 
              key={product.id} 
              product={product} 
              selecionaProduto={(id) => 
                setProdutos(prev => 
                  prev.map(p => p.id === id ? { ...p, selecionado: !p.selecionado } : p)
                )
              } 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
