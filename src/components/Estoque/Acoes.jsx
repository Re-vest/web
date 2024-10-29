import React, { useState } from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";
import Filter from "./Filter";
import estoque from "../../styles/estoque.module.css";

export const Acoes = ({
  products,
  setSearchTerm,
  options,
  handleFilterChange,
  onClick
}) => {
  return (
    <div className={estoque["header"]}>
      <div className={estoque["search"]}>
        <Input
          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={setSearchTerm} 
        />
      </div>
      <div className={estoque["acoes"]}>
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