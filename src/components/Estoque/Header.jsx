import { ArrowDownUp } from "lucide-react";
import React, { useState } from "react";
import api from "../../api";

export const Header = ({ produtos, setProdutos }) => {

  const [ordem, setOrdem] = useState(true)

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

  const ordenarPreco = async () => {
    setOrdem(!ordem)
    const response = await api.get(`/produtos/por-preco?ordem=${ordem ? 'asc' : 'desc'}`)
    response.data.map(product => {
      product.categoria = opcoesCategoria.find(category => category.value === product.categoria).label
      product.tipo = opcoesTipo.find(type => type.value === product.tipo).label
    })
    setProdutos(response.data)
  }
  return (
    <thead>
      <tr>
        <th></th>
        <th>Código ID</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "5px",
              justifyContent: "center",
            }}
          >
            Status
          </div>
        </th>
        <th onClick={ordenarPreco}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "9px",
              justifyContent: "center",
              cursor: 'pointer'
            }}
          >
            Preço
            <ArrowDownUp size={18} />
          </div>
        </th>
        <th>Categoria</th>
        <th>Ações</th>
      </tr>
    </thead>
  );
};