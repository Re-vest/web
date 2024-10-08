import React from "react";
import Select from "react-select";
import MakeAnimation from "react-select/animated";

const options = [
  {
    label: "Status",
    options: [
      { label: "Disponível", value: "Disponível" },
      { label: "Oculto", value: "oculto" },
      { label: "Indisponível", value: "indisponivel" },
      { label: "Vendido", value: "vendido" },
    ],
  },
  {
    label: "Quantidade",
    options: [
      { label: "Até 5 itens", value: "ate_5_itens" },
      { label: "Mais de 5 itens", value: "mais_de_5_itens" },
    ],
  },
  {
    label: "Tipo",
    options: [
      { label: "Roupas", value: "roupas" },
      { label: "Acessórios", value: "acessorios" },
    ],
  },
  {
    label: "Valor",
    options: [
      { label: "Até R$5,00", value: "ate_5_reais" },
      { label: "Entre R$6 - R$20,00", value: "entre_6_e_20_reais" },
      { label: "Mais de R$21,00", value: "mais_de_21_reais" },
    ],
  },
];

const makeAnimation = MakeAnimation();

const Filter = () => (
  <div style={{ maxWidth: "570px", fontSize: "14px" }}>
    <Select
      className="z-[999]"
      options={options}
      isMulti
      components={makeAnimation}
      placeholder="Selecionar"
    />
  </div>
);

export default Filter;
