import { ArrowDownUp } from "lucide-react";
import React from "react";

export const Header = ({ selecionaTodos }) => {
  return (
    <thead>
      <tr>
        <th>
          <input type="checkbox" onChange={selecionaTodos} />
        </th>
        <th>Código ID</th>
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
            Status <ArrowDownUp size={18} />
          </div>
        </th>
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
            Quantidade
            <ArrowDownUp size={18} />
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
