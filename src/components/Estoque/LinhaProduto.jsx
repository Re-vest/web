import React, { useState, useRef, useEffect } from "react";
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
  setDesfazer,
  produtosSelecionados,
  setProdutosSelecionados
}) => {
  const [precoFormatado, setPrecoFormatado] = useState(preco.toLocaleString('pt-br', {style: "currency", currency: "BRL"}))

  let checked = false

  useEffect(() => {

  }, [produtosSelecionados])
  
  return (
    <>
      <tr>
        <td>
          <input value={checked} type="checkbox" onChange={(e) => {
            if(e.target.checked) {
              setProdutosSelecionados(prev => [...prev, product])
            } else {
              setProdutosSelecionados(produtosSelecionados.filter((pr) => pr.id !== product.id));
            }
          }} />
        </td>
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





