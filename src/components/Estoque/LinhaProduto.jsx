import React, { useState, useRef } from "react";
import Modal from "./Modal";
import estoque from "../../styles/estoque.module.css";

export const LinhaProduto = ({
  product,
  id = '',
  nome = '',
  descricao = '',
  preco = '',
  status = '',
  categoria = '',
  editar,
  modalEditar,
  setProdutos,
  produtos
}) => {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{nome}</td>
        <td>{descricao}</td>
        <td>
          <span className={estoque[`status ${product.status.toLowerCase()}`]}>
            {status}
          </span>
        </td>
        <td>R$ {preco}</td>
        <td>{categoria}</td>
        <td>
          <Modal product={product} editar={editar} modalEditar={modalEditar} setProdutos={setProdutos} produtos={produtos}/>
        </td>
      </tr>
    </>
  );
};
