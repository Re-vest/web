import React, { useState, useEffect } from "react";
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
  // Verifica se o produto está selecionado
  const isChecked = produtosSelecionados.some(pr => pr.id === product.id);

  const [precoFormatado, setPrecoFormatado] = useState(preco.toLocaleString('pt-br', { style: "currency", currency: "BRL" }));

  useEffect(() => {
    // Atualiza a lista de produtos selecionados quando produtosSelecionados mudar
  }, [produtosSelecionados]);

  return (
    <>
      <tr>
        <td>
          {status.toLowerCase() !== "oculto" && status.toLowerCase() !== "vendido" && (
            <input
              type="checkbox"
              checked={isChecked} // Vincula o checkbox ao estado de seleção
              onChange={(e) => {
                if (e.target.checked) {
                  setProdutosSelecionados(prev => [...prev, product]); // Adiciona o produto aos selecionados
                } else {
                  setProdutosSelecionados(produtosSelecionados.filter((pr) => pr.id !== product.id)); // Remove o produto da seleção
                }
              }}
            />
          )}
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
          <Modal
            desfazer={desfazer}
            setDesfazer={setDesfazer}
            product={product}
            editar={editar}
            modalEditar={modalEditar}
            setProdutos={setProdutos}
            produtos={produtos}
          />
        </td>
      </tr>
    </>
  );
};