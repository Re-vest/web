
import React, { useCallback, useContext, useEffect, useState } from "react";
import historico from "../../styles/historicoVenda.module.css";

import { Navbar } from "../../components/Navbar";

import { FerramentasHeader } from "../../components/HistoricoVendas/FerramentasHeader";
import { HeaderTable } from "../../components/HistoricoVendas/HeaderTable";
import { RegistroVenda } from "../../components/HistoricoVendas/RegistroVenda";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Download } from "lucide-react/dist/cjs/lucide-react";
import { NavbarMobile } from "../../components/NavbarMobile";
import { UserContext } from "../../Contexts/UserContext";
import { ModalHistorico } from "../../components/HistoricoVendas/ModalHistorico";

export const HistoricoVendas = () => {
  const [vendas, setVendas] = useState([]);
  const [eventos, setEventos] = useState([])
  const [vendaSelecionada, setVendaSelecionada] = useState({})
  const [modal, setModal] = useState(false)
  const [optionsEvento, setOptionsEvento] = useState([{
    label: '',
    value: ''
  }])
  const [eventoSelecionado, setEventoSelecionado] = useState({})
  const [filtredOptions, setFiltredOptions] = useState([]);

  const handleFilterChange = (event) => {
    const options = event;

    setEventoSelecionado(event);
  };

  const getEvents = async () => {
    const response = await api.get('eventos')

    if(response.status === 200) {
      response.data.map(event => {
        setOptionsEvento(prev => [...prev, {
          value: event.id,
          label: event.titulo
        }])
      })

      setEventos(response.data)
    }
  }

  const gerarRelatorio = async () => {
    try {
      await api.get("/relatorio")
      
      
    } catch(e) {
      swal('Erro', 'Houve um erro ao gerar o relatório','error');
    }
  }

  const [busca, setBusca] = useState(""); //busca dos registros pelo input

  const navigate = useNavigate()

  const getVendas = useCallback(async () => {

    try {
      const response = await api.get("/vendas")

      
      if (response.status !== 204) {
        response.data.map(venda => {
          venda.nomeEvento = eventos.find(event => event.id === venda.idEvento).titulo
        })

        setVendas(response.data)
      }

    } catch (e) {
    }
  })

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    if (!sessionStorage.TOKEN || sessionStorage.PERFIL === 'CLIENTE') {
      navigate('/login')
    }

    getVendas()

  }, [eventos])

  // useEffect(() => {
  //   setFiltredOptions(vendas.filter(venda => {
  //     return 
  //   }))
  // }, [eventoSelecionado])

  let VendasFiltradas = vendas.filter((venda) => {
    const produtoExiste = busca
      ? venda.carrinho.some(produto =>
          produto.nome.toLowerCase().includes(busca.toLowerCase())
        )
      : true;

    const emailConfere = busca
      ? venda.usuario.email.toLowerCase() === busca.toLowerCase()
      : true;

    const eventoConfere = eventoSelecionado.value !== undefined
      ? venda.idEvento === eventoSelecionado.value
      : true;

    return (produtoExiste || emailConfere) && eventoConfere;
  }
  );

  return (
    <div className="h-full w-full flex">
      {
        modal && (
          <ModalHistorico setModal={setModal} venda={vendaSelecionada} />
        )
      }
      <div className="hidden md:flex">
        <Navbar />
      </div>

      <div className="flex md:hidden">
        <NavbarMobile />
      </div>
      <div className="w-11/12 my-5 mx-auto md:mx-24 font-sans flex flex-col gap-2.5 relative">
        <div className={historico['header']}>
          <h2>Histórico de Vendas</h2>
        </div>
        <FerramentasHeader
          setBusca={setBusca}
          gerarRelatorio={gerarRelatorio}
          eventos={optionsEvento}
          handleFilterChange={handleFilterChange}
        />

        <div className="w-full overflow-x-scroll">
        <table className="w-full border-collapse max-h-96 overflow-x-scroll">
          <HeaderTable />
          <tbody>

            {VendasFiltradas.map((venda) => (
              <RegistroVenda key={venda.id} venda={venda} setVendaSelecionada={setVendaSelecionada} setModal={setModal} />
            ))}

          </tbody>
        </table>

        </div>


        <div
          className="absolute bottom-14 right-0 p-5 bg-yellow-500 rounded-full md:hidden"
          onClick={gerarRelatorio}
        >
          <Download size={16} />
        </div>
      </div>
    </div>

  );
};
