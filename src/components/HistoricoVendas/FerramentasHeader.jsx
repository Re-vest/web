import React from "react";
import { Input } from "../Input";
import { Search } from "lucide-react";
import { Button } from "../Button";
import api from "../../api";

export const FerramentasHeader = ({ setBusca }) => {

  const gerarRelatorio = async () => {
    await api.get("/relatorio")
  }

  return (
    <div className="header">
      <div className="search">
        <Input 
          placeholder="Pesquisa..."
          icon={<Search w-full/>}
          onChange={setBusca}
        />
      </div>
      <div className="acoes"> 
        <Button text={"Exportar Relatório"} onClick={gerarRelatorio} />
      </div>
    </div>
  );
};
