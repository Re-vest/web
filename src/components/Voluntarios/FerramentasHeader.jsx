import React from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import  Filtro from "./Filtros";
import table from '../../styles/voluntarios.module.css'

export const FerramentasHeader = ({pesquisaVoluntario, setPesquisaVoluntario, options, atualizandoFiltros, onClick}) => {

  return (

    
    <div className={table["header"]}>
      <div className={table["search"]}>
        <Input
          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={setPesquisaVoluntario}
        />
      </div>
      <div className={table["acoes"]}>
        <Filtro 
        options={options} 
        atualizandoFiltros={atualizandoFiltros}/>
        <Button 
          text={"Novo Voluntário"} 
          icon={<Plus size={24} />}
          onClick={onClick} 
        />
      </div>
    </div>
  );
};