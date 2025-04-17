import React from "react";

export const HeaderTable = ({ }) => {
  return (
    <thead>
      <tr>
        <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Data</th>
        <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Nome</th>
        <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">E-mail</th>
        <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Quantidade</th>
        <th className="sticky top-0 bg-gray-200 z-10 p-2.5 text-center">Preço</th>
      </tr>
    </thead>
  );
};
