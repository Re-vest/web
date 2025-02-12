import React, { useState } from "react";
import { Input } from "../Input";
import { Plus, RotateCcw, Search, ShoppingCart } from "lucide-react";
import { Button } from "../Button";
import Filter from "./Filter";
import estoque from "../../styles/estoque.module.css";
import api from "../../api";

export const Acoes = ({
  setSearchTerm,
  options,
  handleFilterChange,
  onClick,
  desfazer,
  setDesfazer,
  setProdutos,
  setOpenCarrinho
}) => {
  const opcoesTipo = [
    { label: "Calçados", value: "CALCADO" },
    { label: "Camisas", value: "CAMISETA" },
    { label: "Calças", value: "CALCA" },
    { label: "Blusas", value: "BLUSA" },
    { label: "Vestidos", value: "VESTIDO" },
    { label: "Shorts", value: "SHORTS" },
    { label: "Bolsas", value: "BOLSA" },
    { label: "Cintos", value: "CINTO" },
    { label: "Relógios", value: "RELOGIO" },
    { label: "Óculos", value: "OCULOS" },
    { label: "Outros", value: "OUTRO" },
  ]
const opcoesCategoria = [
  { label: "Roupa", value: "ROUPA" },
  { label: "Acessório", value: "ACESSORIO" },
]

  const desfazerProduto = async () => {
    let desfazerAux = desfazer
    let produto = desfazerAux.pop()

    produto.tipo = opcoesTipo.find((opcao) => opcao.label === produto.tipo).value
    produto.categoria = opcoesCategoria.find((opcao) => opcao.label === produto.categoria).value
     
    const formData = new FormData();
      formData.append('produto', new Blob([JSON.stringify(produto)], {
        type: 'application/json'
      }));

      const response = await api.post(`/produtos?idUsuario=${sessionStorage.ID_USER}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      produto.id = response.data.id

      if(response.status === 201) {
        setDesfazer(desfazerAux)
        produto.tipo = opcoesTipo.find((opcao) => opcao.value === produto.tipo).label
        produto.categoria = opcoesCategoria.find((opcao) => opcao.value === produto.categoria).label
        setProdutos(prev => [...prev, produto])
      }
  }

  return (
    <div className={estoque["header"]}>
      <div className={estoque["search"]}>
        <Input
          placeholder="Pesquisa..."
          icon={<Search w-full />}
          onChange={setSearchTerm} 
        />
      </div>
      <div className={estoque["acoes"]}>
        <Filter options={options} handleFilterChange={handleFilterChange} />
        <div className="hidden md:flex gap-3">
          {desfazer.length > 0 && (

          <Button icon={<RotateCcw size={24} />} onClick={desfazerProduto} />
          )}
        <Button
          text={"Adicionar Produto"}
          icon={<Plus size={24} />}
          onClick={onClick}
        />

        <Button icon={<ShoppingCart size={24} />} secondary onClick={() => setOpenCarrinho(prev => !prev)} />

        </div>
      </div>
    </div>
  );
};