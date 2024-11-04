import React from "react"; 

import { Bell} from "lucide-react"; 
import ati from '../../styles/voluntarios.module.css'

export const AtividadesRecentes = ({ atividade }) => {

  return (
    <div className={ati["atividade-card"]}>

        <div className={ati["imgArea"]}>
        < Bell size={20}/>
        </div>

    <div>

      <p className={ati["idAtividade"]}> {atividade.id} </p>
      <p className={ati["dataAtividade"]}> {atividade.data} </p>
      <p className={ati["acaoAtividade"]}> 
        <strong> {atividade.acao}</strong> 
      </p>
      <p className={ati["nomeAtividade"]}> Alterado por {atividade.nomeVoluntario} </p>
    </div>
      
    </div>
  );
};
