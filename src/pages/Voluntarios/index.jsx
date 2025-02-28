import React, { useCallback, useState } from "react";
import { useEffect } from 'react';
import dash from "../../styles/voluntarios.module.css";

import { Navbar } from "../../components/Navbar";
import { HeaderTable } from "../../components/Voluntarios/HeaderTable";
import { Voluntario } from "../../components/Voluntarios/LinhaVoluntario";
import { FerramentasHeader } from "../../components/Voluntarios/FerramentasHeader";
import { AtividadesRecentes } from "../../components/Voluntarios/AtividadesRecentes";
import api from '../../api'

import CadastroVoluntario from "../../components/Voluntarios/ModalDeCadastro";

import ErrorBoundary from "../../components/ErrorBoundary" // pra depurar erro
import { useNavigate } from "react-router-dom";

export const Voluntarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editar, setEditar] = useState("");
  const [voluntarios, setVoluntarios] = useState([]);

  const [atividades, setAtividade] = useState([]);

  const filtros = [
    // {
    //   label: "Status",
    //   options: [
    //     { label: "Ativo", value: "ATIVO" },
    //     { label: "Inativo", value: "INATIVO" }
    //   ]
    // },
    {
      label: "Permissões",
      options: [
        { label: "Administrador", value: "ADMINISTRADOR" },
        // { label: "Supervisor", value: "SUPERVISOR" },
        { label: "Voluntário", value: "VOLUNTARIO" }
      ]
    }
  ]

  const [termoPesquisa, setTermoPesquisa] = useState(""); // input - pesquisa
  const [filtredOptions, setFiltredOptions] = useState([]); // filtros 
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    permissao: [],
  });

  const navigate = useNavigate()

  const getUsers = async () => {
    try {
      const response = await api.get('/usuarios')
      let users = response.data.filter(user => {
        return user.perfil === 'ADMINISTRADOR' || user.perfil === 'VOLUNTARIO'
      })
      setVoluntarios(users)
    } catch(e) {
      console.log(e);
      
    }
  }

  const getHistorico = useCallback(async () => {
    try {
      const response = await api.get("/historico")
      let histories = []
      
      if(response.status !== 204) {
        histories = response.data

        histories.map(async (history) => {
          try {
            const user = await api.get(`/usuarios/${history.idUsuario}`)
            
            history.nomeUsuario = user.data.nome
          } catch (e) {
            console.log(e);
          }
        })

        setTimeout(() => {
          setAtividade(histories.reverse())
        }, 100)

      }
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    getUsers()
    getHistorico()
  }, [])

  // filtra
  useEffect(() => {

    if(sessionStorage.PERFIL !== 'ADMINISTRADOR' || !sessionStorage.PERFIL) {
      navigate('/dashboard')
    }

  setFiltredOptions(
    voluntarios.filter((volunteer) => {

      const termo = termoPesquisa.toLowerCase();
      const buscarVoluntario = 
        String(volunteer.id).toLowerCase().includes(termo) ||
        volunteer.nome.toLowerCase().includes(termo) 


      // const statusSelecionado = selectedFilters.status.length === 0 || //status
      //   selectedFilters.status.includes(volunteer.status.toUpperCase()); 

      const permissaoSelecionada = selectedFilters.permissao.length === 0 || //permissão
        selectedFilters.permissao.includes(volunteer.perfil.toUpperCase());

      return buscarVoluntario && permissaoSelecionada;
    })
  );

  }, [selectedFilters, voluntarios, termoPesquisa]);


  // atualiza os filtros
  const atualizandoFiltros = (event) => {
    const options = event;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      selectedValues.push(options[i].value);
    }

    const novaSelecao = { ...selectedFilters };

      filtros.forEach((group) => {
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
      <div className="w-11/12 my-5 mx-28 font-sans flex flex-col gap-2.5">
        <div className={dash["header"]}>
          <h2>Gerenciar Equipe</h2>
        </div>

    <ErrorBoundary>
        <FerramentasHeader 
          volunteer={voluntarios}
          setVoluntarios={setVoluntarios}
          setPesquisaVoluntario={setTermoPesquisa} //input p/ pesquisa 
          options={filtros} // filtros
          atualizandoFiltros={atualizandoFiltros} //atualizar os filtros
          onClick={() => setModalOpen(true)}
          />
    </ErrorBoundary>

        <div className={dash["container_tudo"]}>

          {/* <table className="h-600 overflow-y-auto w-[68%] border-collapse"> */}
          <table className={dash["volunteer-list"]}>
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
                  permissao={volunteer.perfil}
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
            /*onClose={() => setModalOpen(false)}*/
            onClose={() => {
              setModalOpen(false);
            }}                     
          />
          
        )}

          <div className={dash["recentActivities"]}>

              {/* <h1>Atividades Recentes</h1> */}
            <div className={dash["atividades-container"]}>
              <div className={dash["atividades-lista"]}>
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
