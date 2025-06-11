import React from "react";

import { Bell } from "lucide-react";
import ati from '../../styles/voluntarios.module.css'

export const AtividadesRecentes = ({ atividade }) => {

  const date = new Date(atividade.dataHora)

  return (
    <div className={ati["atividade-card"]}>

      <div className={ati["imgArea"]}>
        < Bell size={20} />
      </div>

      <div>

        <p className={ati["idAtividade"]}> {atividade.id} </p>
        <p className={ati["dataAtividade"]}> {date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: "short",
          year: "2-digit"
        })} </p>
        <p className={ati["acaoAtividade"]}>
          <strong> {atividade.acao}</strong>
        </p>
        <p className={ati["nomeAtividade"]}> Alterado por {atividade.nomeUsuario} </p>
      </div>

    </div>
  );
};
