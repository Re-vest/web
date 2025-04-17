import React from "react";
import { Input } from "../Input";
import { Download, Search } from "lucide-react";
import { Button } from "../Button";

export const FerramentasHeader = ({ setBusca, gerarRelatorio }) => {

  return (
    <div className='flex gap-10'>
        <Input 
          placeholder="Pesquisa..."
          icon={<Search w-full/>}
          onChange={setBusca}
        />
      <div className="hidden md:flex gap-3">

        <Button text={"Exportar Relatório"} onClick={gerarRelatorio} icon={<Download size={24} />} />
      </div>
    </div>
  );
};
