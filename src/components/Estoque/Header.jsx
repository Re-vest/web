import { ArrowDownUp } from "lucide-react";
import React, { useState } from "react";
import api from "../../api";

export const Header = ({ produtos, setProdutos }) => {

  const [ordem, setOrdem] = useState(true)

  const ordenarPreco = async () => {
    setOrdem(!ordem)
    const response = await api.get(`/produtos/por-preco?ordem=${ordem ? 'asc' : 'desc'}`)
    setProdutos(response.data)
  }
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
        <th onClick={ordenarPreco}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "9px",
              justifyContent: "center",
              cursor: 'pointer'
            }}
          >
            Preço
            <ArrowDownUp size={18} />
          </div>
        </th>
        <th>Tipo</th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};
