import React from "react";
import { Input } from "../Input";
import { Plus, Search } from "lucide-react";
import { Button } from "../Button";

const options = [
  {
    name: "Status",
    value: "Status",
  },
  {
    name: "Categoria",
    value: "Categoria",
  },
  {
    name: "Preço",
    value: "Preço",
  },
];

export const Acoes = () => {
  return (
    <div className="header">
      <div className="search">
        <Input placeholder="Pesquisa..." icon={<Search />} />
      </div>
      <div className="acoes">
  
        <Button text={"Adicionar Produto"} icon={<Plus size={24}/>}/>
      </div>
    </div>
  );
};
