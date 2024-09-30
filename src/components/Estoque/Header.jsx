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
        <th>Status</th>
        <th>Quantidade</th>
        <th>Preço</th>
        <th>Categoria</th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};
