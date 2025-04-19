import React, { useState, useRef } from "react";


export const RegistroVenda = ({ venda }) => {

  return (
    <>
      <tr className="h-12">
        <td>{new Date(venda.dataVenda + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
        <td>{venda.carrinho[0].nome}</td>
        <td>{venda.usuario.email}</td>
        <td>{venda.carrinho.length}</td>
        <td>R$ {venda.valorTotal.toFixed(2)}</td>
      </tr>
    </>
  );
};
