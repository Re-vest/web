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
import { Plus } from "lucide-react";
import { NavbarMobile } from "../../components/NavbarMobile";

export const Estoque = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [desfazer, setDesfazer] = useState([]);
  

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
  ]
const opcoesCategoria = [
  { label: "Roupa", value: "ROUPA" },
  { label: "Acessório", value: "ACESSORIO" },
]


  useEffect(() => {
    if(!sessionStorage.TOKEN || sessionStorage.PERFIL === 'CLIENTE') {
      navigate('/login')
    } else {
      try {
        api.get("/produtos").then(response => {
          response.data.map(product => {
            product.categoria = opcoesCategoria.find(category => category.value === product.categoria).label
            product.tipo = opcoesTipo.find(type => type.value === product.tipo).label
          })

          if(response.status !== 204) setProdutos(response.data)
          console.log(response.data)
        })
      } catch(e) {
        console.log(e)
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
  }, [searchTerm, selectedFilters, produtos])

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

  console.log(desfazer);
  

  return (
    <div className="w-full h-full flex justify-center">
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
            setEditar({})
            setModalOpen(true)
          }}
          desfazer={desfazer}
          setDesfazer={setDesfazer}
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
      <div className="absolute bottom-14 right-0 p-5 bg-yellow-500 rounded-full md:hidden" onClick={() => {
            setEditar({})
            setModalOpen(true)
          }}>
        <Plus size={16} />
      </div>
      </div>
    </div>
    
  );
};
