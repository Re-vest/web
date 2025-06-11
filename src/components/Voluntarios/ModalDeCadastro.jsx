import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import PickList from "./picklist";
// import { Input } from "../Input";
import {Input} from "./Input";
import { Button } from "../Button";
//import { Voluntarios } from "../../pages/Voluntarios";
import modal from '../../styles/voluntarios.module.css'
import api from "../../api";


Modal.setAppElement("#root");

const CadastroVoluntario = ({isOpen, onClose, setVoluntarios, editar, voluntarios }) => {
  const [nome, setNome] = useState(editar.nome ? editar.nome : '');
  const [email, setEmail] = useState(editar.email ? editar.email : '');
  const [senha, setSenha] = useState(editar.senha ? editar.email : '');
  const [permissao, setPermissao] = useState(editar.perfil ? editar.perfil : '');

  const [mensagemErro, setMensagemErro] = useState("");


  async function salvar(event) {
    event.preventDefault(); // Evitar o recarregamento da página
  
    if (!nome || !email || !permissao) {

      setMensagemErro("Por favor, preencha todos os campos!");
      return;
    }
      
     // Limpa a mensagem de erro se tudo estiver preenchido
    setMensagemErro("");
  
    if (!editar.id) { //cadastrar voluntario
      
      try {
        const addVoluntario = {
          nome,
          email,
          senha,
          // telefone,
          // status,
          perfil: permissao
        };

        const response = await api.post("/usuarios", addVoluntario)

        setVoluntarios(prev => [...prev, response.data]);
        swal("Sucesso", "Voluntário cadastrado com sucesso", "success", {
          timer: 1000,
          button: {
            visible: false,
          }});
      } catch(e) {
        swal("Erro ao cadastrar", e.response.data, "error");

        console.log(e);
        swal("Erro", "Erro ao cadastra voluntário", "error", {
          timer: 1000,
          button: {
            visible: false,
          }});
      }
  
    } else {

      try {

        const editarVolutario = { //atualizar voluntario
          id: editar.id,
          nome,
          email,
          senha,
          // telefone,
          // status,
          perfil: permissao
        };

        const response = await api.put(`/usuarios/${editar.id}`, editarVolutario)
    
        const voluntarioEditado = voluntarios.map(eventProps => {
          if (eventProps.id === response.data.id) {
            return response.data;
          } else return eventProps;
        });
    
        setVoluntarios(voluntarioEditado);
        swal("Sucesso", "Voluntário editado com sucesso", "success", {
          timer: 1000,
          button: {
            visible: false,
          }});
      } catch(e) {
        console.log(e);
        
      }
    }
  
    onClose(); // Fechar o modal
  }
  
  const permissaoSelecionada = (value) => {
    setPermissao(value);
  };

  


  return (
    //reinderiza o modal
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cadastrar Voluntario"
      className="w-auto bg-white p-5 rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]"
      shouldCloseOnOverlayClick={false}
    >
      <form className='flex justify-center flex-col w-full p-8 rounded-2xl gap-4' onSubmit={salvar}>
        
        <div className="flex flex-col w-full gap-1.5">
          <label>Nome:</label>
          <Input value={nome} placeholder={""} onChange={setNome} />
        </div>

        <div className="flex flex-col w-full gap-1.5">
          <label>Email:</label>
          <Input value={email} placeholder={""} onChange={setEmail} type="phone" />
        </div>

        <div className="flex flex-col w-full gap-1.5">
          <label>Senha:</label>
          <Input value={senha} placeholder={""} onChange={setSenha}/>
        </div>

        <div className="flex w-full flex-col gap-1.5">
          <label>Definir Permissão:</label>
          <div className="flex flex-col justify-evenly">
              <span>
                <label className="flex items-center gap-1.5">
                      <input
                        className="w-5 h-5 mr-1.5"
                        type="checkbox"
                        checked={permissao === "ADMINISTRADOR" || editar.permissao === 'ADMINISTRADOR'}
                        onChange={() => permissaoSelecionada("ADMINISTRADOR")}
                        />
                      Administrador
                </label>
                <p className="text-[13px] pl-6 text-gray-500">Pode criar Eventos;</p>
                <p className="text-[13px] pl-6 text-gray-500">Pode adicionar e remover usuários;</p>
                <p className="text-[13px] pl-6 text-gray-500">Pode editar usuários (alterar senha, perrmissões, ...).</p>
              </span>

              <span>
                <label className="flex items-center gap-1.5">
                  <input
                    className="w-5 h-5 mr-1.5"
                    type="checkbox"
                    checked={permissao === "VOLUNTARIO" || editar.permissao === 'VOLUNTARIO'}
                    onChange={() => permissaoSelecionada("VOLUNTARIO")}
                    />
                  Voluntário
                </label>
                <p className="text-[13px] pl-6 text-gray-500">Pode acessar a dashboard;</p>
                <p className="text-[13px] pl-6 text-gray-500">Pode dar baixa no estoque;</p>
                <p className="text-[13px] pl-6 text-gray-500">Pode adicionar e remover produtos do estoque e da vitrine.</p>
              </span>
          </div>
        </div>

        {mensagemErro && <p className="text-red-500 text-[13px]">{mensagemErro}</p>}
        
        <div className="flex justify-end gap-2.5">
          <Button text={"Cancelar"} onClick={onClose} secondary style={{ textAlign: "center" }} />
          <Button text={"Salvar"} onClick={salvar} />
        </div>
      </form>
    </Modal>
  );
};

export default CadastroVoluntario;
