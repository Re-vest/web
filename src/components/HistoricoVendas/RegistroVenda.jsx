import React, { useState, useRef } from "react";


export const RegistroVenda = ({ venda, setVendaSelecionada, setModal }) => {

  return (
    <>
      <tr className="h-12 cursor-pointer" onClick={e => {
          setVendaSelecionada(venda)
          setModal(true)
        }}>
        <td>{new Date(venda.dataVenda + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
        <td>{venda.nomeEvento}</td>
        <td>{venda.usuario.email}</td>
        <td>{venda.carrinho.length}</td>
        <td>R$ {venda.valorTotal.toFixed(2)}</td>
      </tr>
    </>
  );
};
