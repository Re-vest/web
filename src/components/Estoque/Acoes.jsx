import React from "react";

export const Acoes = () => {
  return (
    <div className="acoes">
      <input type="text" placeholder="Pesquisar..." />
      <button className="filter-btn">Filtrar: ↓</button>
      <button className="sort-btn">Ordenar Por: ↓</button>
      <button className="add-product-btn">+ Adicionar Produto</button>
    </div>
  );
};
