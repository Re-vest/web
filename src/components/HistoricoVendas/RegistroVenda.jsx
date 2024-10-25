import React, { useState, useRef } from "react";


export const RegistroVenda = ({ venda }) => {

  return (
    <>
      <tr>
        <td>{venda.id}</td>
        <td>{venda.nome}</td>
        <td>{venda.email}</td>
        <td>{venda.quantidade}</td>
        <td>R$ {venda.preco.toFixed(2)}</td>
      </tr>
    </>
  );
};
