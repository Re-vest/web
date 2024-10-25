import { ArrowDownUp } from "lucide-react";
import React from "react";

export const Header = ({ selecionaTodos }) => {
  return (
    <thead>
      <tr>
        <th>Código ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            Status
          </div>
        </th>
        <th>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "9px",
              justifyContent: "center",
            }}
          >
            Preço
            <ArrowDownUp size={18} />
          </div>
        </th>
        <th>Categoria</th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};
