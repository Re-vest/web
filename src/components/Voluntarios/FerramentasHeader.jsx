import React from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import  Filtro from "./Filtros";

export const FerramentasHeader = ({pesquisaVoluntario, setPesquisaVoluntario, options, atualizandoFiltros}) => {

  const handleInputChange = (event) => {
    setPesquisaVoluntario(event.target.value); // Atualiza o termo de pesquisa
  }; 

  return (

    
    <div className="header">
      <div className="search">
        <Input

          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={handleInputChange}

          // placeholder="Pesquisar ..."
          // icon={<Search />}
          // value={pesquisaVoluntario} // atribui o valor digitado
          // onChange={(e) => setPesquisaVoluntario(e.target.value)} // atualiza enquanto a pessoa digita

        />
      </div>
      <div className="acoes">
        <Filtro options={options} atualizandoFiltros={atualizandoFiltros}/>
        <Button text={"Novo Voluntário"} icon={<Plus size={24} />} />
      </div>
    </div>
  );
};