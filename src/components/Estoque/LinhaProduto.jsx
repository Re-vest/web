import React, { useState, useRef } from "react";
import Modal from "./Modal";


export const LinhaProduto = ({ product, selecionaProduto }) => {

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={product.selecionado}
            onChange={() => selecionaProduto(product.id)}
          />
        </td>
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
      <Modal product={product} />
        </td>
      </tr>

      {/* ModalAcoes Component */}
    </>
  );
};
