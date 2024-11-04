import React from "react";
import Modal from "./ModalEditar";
import "../../styles/voluntarios.module.css";

export const Voluntario = ({ 
    id = '',
    nome = '',
    email = '',
    senha = '',
    telefone = '',
    status = '',
    permissao = '',
    editar,
    modalEditar,
    voluntarios,
    volunteer, 
    setVoluntarios,
    selecionaVoluntario }) => {
  

  return (
    <tr>
      <td className="text-center">{id}</td>
      <td className="text-cemter">{nome}</td>
      {/* <td>
        <span className={`status ${status.toLowerCase()}`}>
          {status}
        </span>
      </td> */}
      <td className="text-center">{permissao}</td>
        <td className="text-center">
          <Modal volunteer={volunteer} editar={editar} modalEditar={modalEditar} setVoluntarios={setVoluntarios} voluntarios={voluntarios}/>
        </td>
    </tr>
  );
};