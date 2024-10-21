import React, { useState } from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import Filter from "./Filter";

export const Acoes = ({
  products,
  setSearchTerm,
  options,
  handleFilterChange,
  onClick
}) => {
  return (
    <div className="header">
      <div className="search">
        <Input
          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={setSearchTerm} // Capturando a pesquisa
        />
      </div>
      <div className="acoes">
        <Filter options={options} handleFilterChange={handleFilterChange} />
        <Button
          text={"Adicionar Produto"}
          icon={<Plus size={24} />}
          onClick={onClick}
        />
      </div>
    </div>
  );
};
