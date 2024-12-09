
import React, { useCallback, useEffect, useState } from "react";
import "../../styles/historicoVenda.css";

import { Navbar } from "../../components/Navbar";

import { FerramentasHeader } from "../../components/HistoricoVendas/FerramentasHeader";
import { HeaderTable } from "../../components/HistoricoVendas/HeaderTable";
import { RegistroVenda } from "../../components/HistoricoVendas/RegistroVenda";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";

export const HistoricoVendas = () => {
  const [vendas, setVendas] = useState([]);


  const [busca, setBusca] = useState(""); //busca dos registros pelo input

  // Filtra
  
  
  
  const navigate = useNavigate()
  
  const getVendas = useCallback(async () => {
    
    try {
      const response = await api.get("/vendas")
      
      console.log(response.data);
      
      if(response.status !== 204) setVendas(response.data)
      
    } catch(e) {
      console.log(e);
      
    }
  })
  
  useEffect(() => {
    if(!sessionStorage.TOKEN || sessionStorage.PERFIL === 'CLIENTE') {
      navigate('/login')
    }
    
    getVendas()
  }, [])
  
  let VendasFiltradas = vendas.filter((venda) =>
      
    String(venda.id).toLowerCase().includes(busca.toLowerCase()) ||
    venda.carrinho[0].nome.toLowerCase().includes(busca.toLowerCase()) ||
    venda.usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
    venda.usuario.email.toLowerCase().includes(busca.toLowerCase())
);

  console.log(VendasFiltradas);
  

  return (
    <div className="h-full w-full flex">
      <Navbar />
      <div className="w-11/12 my-5 mx-20 font-sans flex flex-col gap-2.5">
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
