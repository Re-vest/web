import React, { useState } from "react";
import { useEffect } from 'react';
import "../../styles/voluntarios.css";

import { Navbar } from "../../components/Navbar";
import { HeaderTable } from "../../components/Voluntarios/HeaderTable";
import { Voluntario } from "../../components/Voluntarios/LinhaVoluntario";
import { FerramentasHeader } from "../../components/Voluntarios/FerramentasHeader";
import { AtividadesRecentes } from "../../components/Voluntarios/AtividadesRecentes";

import CadastroVoluntario from "../../components/Voluntarios/ModalDeCadastro";

import ErrorBoundary from "../../components/ErrorBoundary" // pra depurar erro

export const Voluntarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [voluntarios, setVoluntarios] = useState([
    {
      id: "23785",
      nome: "Gustavo de Oliveira Antunes",
      email: "gustavo@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "ATIVO",
      permissao: "ADMIN",
      selecionado: false,
    },
    {
      id: "16487",
      nome: "Patrick de Lima Rodrigues",
      email: "patrick@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "ATIVO",
      permissao: "ADMIN",
      selecionado: false,
    },
    {
      id: "29478",
      nome: "Rafaela de Souza Scarabe",
      email: "rafaela@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "INATIVO",
      permissao: "ADMIN",
      selecionado: false,
    },
    {
      id: "20636",
      nome: "Samuel de Oliveira Batista",
      email: "samuel@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "ATIVO",
      permissao: "VOLUNTÁRIO",
      selecionado: false,
    },
    {
      id: "72068",
      nome: "Vitor Santos Tigre",
      email: "vitorTigre@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "ATIVO",
      permissao: "VOLUNTÁRIO",
      selecionado: false,
    },
    {
      id: "01754",
      nome: "Victor Hugo Carvalho Moreira dos Santos",
      email: "victorMoreira@gmail.com",
      senha: "123456",
      telefone: "11939606494",
      status: "ATIVO",
      permissao: "VOLUNTÁRIO",
      selecionado: false,
    },
    // {
    //   id: "0128",
    //   nome: "Victor Hugo Carvalho Moreira dos Santos",
    //   email: "patrick@gmail.com",
    //   senha: "123456",
    //   telefone: "11939606494",
    //   status: "ATIVO",
    //   permissao: "VOLUNTÁRIO",
    //   selecionado: false,
    // },
    // {
    //   id: "0129",
    //   nome: "Victor Hugo Carvalho Moreira dos Santos",
    //   email: "patrick@gmail.com",
    //   senha: "123456",
    //   telefone: "11939606494",
    //   status: "ATIVO",
    //   permissao: "VOLUNTÁRIO",
    //   selecionado: false,
    // },
    // {
    //   id: "0130",
    //   nome: "Victor Hugo Carvalho Moreira dos Santos",
    //   email: "patrick@gmail.com",
    //   senha: "123456",
    //   telefone: "11939606494",
    //   status: "ATIVO",
    //   permissao: "VOLUNTÁRIO",
    //   selecionado: false,
    // },
    // {
    //   id: "0131",
    //   nome: "Victor Hugo Carvalho Moreira dos Santos",
    //   email: "patrick@gmail.com",
    //   senha: "123456",
    //   telefone: "11939606494",
    //   status: "ATIVO",
    //   permissao: "VOLUNTÁRIO",
    //   selecionado: false,
    // },
    // {
    //   id: "0132",
    //   nome: "Victor Hugo Carvalho Moreira dos Santos",
    //   email: "patrick@gmail.com",
    //   senha: "123456",
    //   telefone: "11939606494",
    //   status: "ATIVO",
    //   permissao: "VOLUNTÁRIO",
    //   selecionado: false,
    // },
  ]);

  const [atividades] = useState([
    {
      id: 1,
      data: "2024-10-01",
      nomeVoluntario: "Patrick de Lima Rodrigues",
      acao: "Produto adicionado",
    },
    {
      id: 2,
      data: "2024-09-30",
      nomeVoluntario: "Rafaela de Souza Scarabe",
      acao: "Preço atualizado",
    },
    {
      id: 3,
      data: "2024-09-28",
      nomeVoluntario: "Samuel de Oliveira Batista",
      acao: "Produto removido",
    },
    {
        id: 4,
        data: "2024-09-25",
        nomeVoluntario: "Gustavo de Oliveira Antunes",
        acao: "Voluntário criado",
      },
      {
        id: 5,
        data: "2024-09-24",
        nomeVoluntario: "Victor Hugo Carvalho Moreira",
        acao: "Venda realizada",
      },
      {
        id: 6,
        data: "2024-09-22",
        nomeVoluntario: "Vitor Santos Tigre",
        acao: "Relatório exportado",
      },
      {
        id: 7,
        data: "2024-09-23",
        nomeVoluntario: "Vitor Santos Tigre",
        acao: "testando outros",
      },
      {
        id: 8,
        data: "2024-09-23",
        nomeVoluntario: "Vitor Santos Tigre",
        acao: "Relatório exportado",
      },
  ]);

  const fltros = [
    {
      label: "Status",
      options: [
        { label: "Ativo", value: "ATIVO" },
        { label: "Inativo", value: "INATIVO" }
      ]
    },
    {
      label: "Permissões",
      options: [
        { label: "Administrador", value: "ADMIN" },
        { label: "Supervisor", value: "SUPERVISOR" },
        { label: "Voluntário", value: "VOLUNTARIO" }
      ]
    }
  ];

  // //MARK: CHECKBOX
  // const selecionaVoluntario = (id) => {
  //   setVoluntarios((preVoluntarios) =>
  //     preVoluntarios.map((volunteer) =>
  //       volunteer.id === id
  //         ? { ...volunteer, selecionado: !volunteer.selecionado }
  //         : volunteer
  //     )
  //   );
  // };

  // const selecionaTodos = (event) => {
  //   const isChecked = event.target.checked;
  //   setVoluntarios((preVoluntarios) =>
  //     preVoluntarios.map((volunteer) => ({
  //       ...volunteer,
  //       selecionado: isChecked,
  //     }))
  //   );
  // };

  //MARK: FILTROS

  const [termoPesquisa, setTermoPesquisa] = useState(""); // input - pesquisa
  const [filtredOptions, setFiltredOptions] = useState([]); // filtros 
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    permissao: [],
  });

  // filtra
  useEffect(() => {

  setFiltredOptions(
    voluntarios.filter((volunteer) => {

      const termo = termoPesquisa.toLowerCase();
      const buscarVoluntario = 
        volunteer.id.toLowerCase().includes(termo) ||
        volunteer.nome.toLowerCase().includes(termo) 


      const statusSelecionado = selectedFilters.status.length === 0 || //status
        selectedFilters.status.includes(volunteer.status.toUpperCase()); 

      const permissaoSelecionada = selectedFilters.permissao.length === 0 || //permissão
        selectedFilters.permissao.includes(volunteer.permissao.toUpperCase());

      return buscarVoluntario && statusSelecionado && permissaoSelecionada;
    })
  );

    console.log(filtredOptions);// testando filtros

  }, [selectedFilters, voluntarios, termoPesquisa]);


  // atualiza os filtros
  const atualizandoFiltros = (event) => {
    const options = event;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      selectedValues.push(options[i].value);
    }

    const novaSelecao = { ...selectedFilters };

      fltros.forEach((group) => {
        if (group.label.toLowerCase() === "status") {
          novaSelecao.status = selectedValues.filter(
            (value) => group.options.some((option) => option.value === value)
          );
        }

        if (group.label.toLowerCase() === "permissões") {
          novaSelecao.permissao = selectedValues.filter(
            (value) => group.options.some((option) => option.value === value)
          );
        }

      });

      setSelectedFilters(novaSelecao);
  };



  //MARK: RETURN
  return (
    //pra reinderizar tudo na tela
    <div className="h-full w-full flex">
      <Navbar style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }} />
      <div className="w-11/12 my-5 mx-auto font-sans flex flex-col gap-2.5">
        <div className="header">
          <h2>Gerenciar Equipe</h2>
        </div>

    <ErrorBoundary>

        <FerramentasHeader 
          volunteer={voluntarios}
          setVoluntarios={setVoluntarios}
          setPesquisaVoluntario={setTermoPesquisa} //input p/ pesquisa 
          options={fltros} // filtros
          atualizandoFiltros={atualizandoFiltros} //atualizar os filtros
          onClick={() => setModalOpen(true)}
          />
    </ErrorBoundary>

        <div className="container_tudo">

          {/* <table className="h-600 overflow-y-auto w-[68%] border-collapse"> */}
          <table className="volunteer-list">
          {/* <table className="volunteer-list"> */}
            <HeaderTable 
            //   selecionaTodos={(e) =>
            //     setvoluntarios((prev) =>
            //     prev.map((v) => ({ ...v, selecionado: e.target.checked }))
            //   )
            // }
             />
            <tbody>

              {filtredOptions.map((volunteer) => (
                // <ErrorBoundary>

                <Voluntario 
                volunteer={volunteer}
                key={volunteer.id}
                id={volunteer.id}
                nome={volunteer.nome}
                status={volunteer.status}
                permissao={volunteer.permissao}
                editar={setEditar}
                modalEditar={setModalOpen}
                setVoluntarios={setVoluntarios}
                voluntarios={voluntarios}
                />

              ))}
            </tbody>
          </table>

          {modalOpen && (
          <CadastroVoluntario
            voluntarios={voluntarios}
            editar={editar}
            isOpen={modalOpen}
            setVoluntarios={setVoluntarios}
            onClose={() => setModalOpen(false)}
          />
        )}

          <div className="recentActivities">

              {/* <h1>Atividades Recentes</h1> */}
            <div className="atividades-container">
              <div className="atividades-lista">
                {atividades.map((atividade) => (
                  <AtividadesRecentes 
                    key={atividade.id}
                    atividade={atividade} /> // card atividade | smp colocar key = id;
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
