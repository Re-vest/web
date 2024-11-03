import React from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import  Filtro from "./Filtros";

export const FerramentasHeader = ({pesquisaVoluntario, setPesquisaVoluntario, options, atualizandoFiltros, onClick}) => {

  return (

    
    <div className="header">
      <div className="search">
        <Input
          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={setPesquisaVoluntario}
        />
      </div>
      <div className="acoes">
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