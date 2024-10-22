import React, { useState, useRef } from "react";
import Modal from "./Modal";

export const LinhaProduto = ({ product, editar, modalEditar }) => {
  return (
    <>
      <tr>
        <td>{product.id}</td>
        <td>{product.descricao}</td>
        <td>
          <span className={`status ${product.status.toLowerCase()}`}>
            {product.status}
          </span>
        </td>
        <td>{product.quantidade}</td>
        <td>R$ {product.preco.toFixed(2)}</td>
        <td>{product.categoria}</td>
        <td>
          <Modal product={product} editar={editar} modalEditar={modalEditar}/>
        </td>
      </tr>
    </>
  );
};
