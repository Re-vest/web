import React, { useState, useRef } from "react";


export const RegistroVenda = ({ venda }) => {

  return (
    <>
      <tr>
        <td>{venda.id}</td>
        <td>{venda.carrinho[0].nome}</td>
        <td>{venda.usuario.email}</td>
        <td>{venda.carrinho.length}</td>
        <td>R$ {venda.valorTotal.toFixed(2)}</td>
      </tr>
    </>
  );
};
