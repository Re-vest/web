import React, { useState, useRef } from "react";
import Modal from "./Modal";
import estoque from "../../styles/estoque.module.css";
export const LinhaProduto = ({
  product,
  id = '',
  nome = '',
  descricao = '',
  preco = 0.0,
  status = '',
  categoria = '',
  editar,
  modalEditar,
  setProdutos,
  produtos,
  desfazer,
  setDesfazer
}) => {
  const [precoFormatado, setPrecoFormatado] = useState(preco.toLocaleString('pt-br', {style: "currency", currency: "BRL"}))
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{nome}</td>
        <td>{descricao}</td>
        <td>
          <span className={estoque[product.status]}>
            {status.toUpperCase()}
          </span>
        </td>
        <td>{preco.toFixed(2)}</td>
        <td>{categoria}</td>
        <td>
          <Modal desfazer={desfazer} setDesfazer={setDesfazer} product={product} editar={editar} modalEditar={modalEditar} setProdutos={setProdutos} produtos={produtos}/>
        </td>
      </tr>
    </>
  );
};





