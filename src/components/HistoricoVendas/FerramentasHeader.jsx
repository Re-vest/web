import React from "react";
import { Input } from "../Input";
import { Download, Search } from "lucide-react";
import { Button } from "../Button";
import Select from "react-select";

export const FerramentasHeader = ({ setBusca, gerarRelatorio, eventos, handleFilterChange }) => {

  return (
    <div className='flex items-center gap-10 z-[100]'>
        <Input 
          placeholder="Pesquisar produto"
          icon={<Search w-full/>}
          onChange={setBusca}
        />

        <Select placeholder="Eventos" className="w-full" options={eventos} onChange={e => handleFilterChange(e)} />
      <div className="hidden md:flex gap-3">

        <Button text={"Exportar Relatório"} onClick={gerarRelatorio} icon={<Download size={24} />} />
      </div>
    </div>
  );
};
