import React, { useState } from "react";
import { Input } from "../Input";
import { Search } from "lucide-react";

export const FerramentasHeader = ({ atualizandoFiltros }) => {

  return (
    <div className="header">
      <div className="search">
        <Input 
          placeholder="Pesquisa..."
          icon={<Search w-full/>}
          onChange={atualizandoFiltros}
        />
      </div>
      <div className="acoes"> 
      </div>
    </div>
  );
};
