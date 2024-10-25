import React from "react";
import { Input } from "../Input";
import { Search } from "lucide-react";

export const FerramentasHeader = ({ setBusca }) => {

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
      </div>
    </div>
  );
};
