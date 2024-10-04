import React, { useState } from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import Filter from "./Filter";

export const Acoes = ({ products, setSearchTerm }) => {

  return (
    <div className="header">
      <div className="search">
        <Input
          placeholder="Pesquisa..."
          icon={<Search />}
          onChange={setSearchTerm} // Capturando a pesquisa
        />
      </div>
      <div className="acoes">
        <Filter />
        <Button text={"Adicionar Produto"} icon={<Plus size={24} />} />
      </div>
    </div>
  );
};
