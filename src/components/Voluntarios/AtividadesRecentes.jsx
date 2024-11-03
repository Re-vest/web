import React from "react"; 

import { Bell} from "lucide-react";

export const AtividadesRecentes = ({ atividade }) => {

  return (
    <div className="atividade-card">

        <div className="imgArea">
        < Bell size={20}/>
        </div>

    <div>

      <p className="idAtividade"> {atividade.id} </p>
      <p className="dataAtividade"> {atividade.data} </p>
      <p className="acaoAtividade"> 
        <strong> {atividade.acao}</strong> 
      </p>
      <p className="nomeAtividade"> Alterado por {atividade.nomeVoluntario} </p>
    </div>
      
    </div>
  );
};
