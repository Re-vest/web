
import React, { useEffect, useState } from "react";
import "../../styles/historicoVenda.css";

import { Navbar } from "../../components/Navbar";

import { FerramentasHeader } from "../../components/HistoricoVendas/FerramentasHeader";
import { HeaderTable } from "../../components/HistoricoVendas/HeaderTable";
import { RegistroVenda } from "../../components/HistoricoVendas/RegistroVenda";
import { useNavigate } from "react-router-dom";

export const HistoricoVendas = () => {
  const [vendas, setVendas] = useState([
    {
      id: "017",
      nome: "Jane Smith",
      email: "janeSmith@gmail.com",
      quantidade: 4,
      preco: 40.37,
    },
    {
      id: "018",
      nome: "John Doe",
      email: "johnDoe@gmail.com",
      quantidade: 2,
      preco: 25.0,
    },
    {
      id: "019",
      nome: "Alice Johnson",
      email: "aliceJ@gmail.com",
      quantidade: 5,
      preco: 55.0,
    },
    {
      id: "020",
      nome: "Robert Brown",
      email: "robertBrown@gmail.com",
      quantidade: 1,
      preco: 15.0,
    },
    {
      id: "021",
      nome: "Emily Davis",
      email: "emilyDavis@gmail.com",
      quantidade: 3,
      preco: 30.0,
    },
    {
      id: "022",
      nome: "Michael Clark",
      email: "michaelC@gmail.com",
      quantidade: 7,
      preco: 70.0,
    },
    {
      id: "023",
      nome: "Laura Wilson",
      email: "lauraWilson@gmail.com",
      quantidade: 6,
      preco: 60.0,
    },
    {
      id: "024",
      nome: "David Harris",
      email: "davidH@gmail.com",
      quantidade: 8,
      preco: 80.0,
    },
    {
      id: "025",
      nome: "Sophia Martinez",
      email: "sophiaM@gmail.com",
      quantidade: 4,
      preco: 45.0,
    },
    {
      id: "026",
      nome: "James Taylor",
      email: "jamesT@gmail.com",
      quantidade: 9,
      preco: 90.0,
    }
    
  ]);


  const [busca, setBusca] = useState(""); //busca dos registros pelo input

  // Filtra
  const VendasFiltradas = 
  
    vendas.filter((venda) =>

          venda.id.toLowerCase().includes(busca.toLowerCase()) ||
          venda.nome.toLowerCase().includes(busca.toLowerCase()) ||
          venda.email.toLowerCase().includes(busca.toLowerCase()) ||
          venda.quantidade.toString().includes(busca) ||
          venda.preco.toFixed(2).includes(busca)
  );

  const navigate = useNavigate()

  useEffect(() => {
    if(!sessionStorage.TOKEN) {
      navigate('/login')
    }
  })

  return (
    <div className="h-full w-full flex">
      <Navbar />
      <div className="w-11/12 my-5 mx-auto font-sans flex flex-col gap-2.5">
        <div className="header">
          <h2>Histórico de Vendas</h2>
        </div>
        <FerramentasHeader
          setBusca={setBusca}
        />

        <table className="w-full border-collapse max-h-96">
          <HeaderTable/>
          <tbody>
            
          {VendasFiltradas.map((venda) => (
              <RegistroVenda key={venda.id} venda={venda} />
            ))}
              
          </tbody>
        </table>
      </div>
    </div>

  );
};
