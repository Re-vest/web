    // src/pages/Estoque.js
    import React, { useState } from "react";
    import "../../styles/estoque.css";
    import { Header } from "../../components/Estoque/Header";
    import { LinhaProduto } from "../../components/Estoque/LinhaProduto";
    import { Acoes } from "../../components/Estoque/Acoes";

    export const Estoque = () => {
      const [produtos, setProdutos] = useState([
        {
          id: "01232555",
          descricao: "Blusa xadrez de manga comprida",
          status: "ATIVO",
          quantidade: 1,
          preco: 7.0,
          categoria: "Infantil",
          selecionado: false,
        },
        {
          id: "01232556",
          descricao: "Camisa xadrez de manga comprida",
          status: "OCULTO",
          quantidade: 1,
          preco: 7.0,
          categoria: "Infantil",
          selecionado: false,
        },
        {
          id: "01232557",
          descricao: "Calça xadrez de manga comprida",
          status: "INDISPONÍVEL",
          quantidade: 1,
          preco: 7.0,
          categoria: "Infantil",
          selecionado: false,
        },
      ]);

      const [searchTerm, setSearchTerm] = useState("")

      const productFiltred = produtos.filter(product => {
        return product.descricao.toLocaleLowerCase().includes(searchTerm.toLowerCase()) || 
        product.id.toLocaleLowerCase().includes(searchTerm.toLowerCase())
      })

      const selecionaProduto = (id) => {
        setProdutos((prevProdutos) =>
          prevProdutos.map((product) =>
            product.id === id ? { ...product, selecionado: !product.selecionado } : product
          )
        );
      };

      const selecionaTodos = (event) => {
        const isChecked = event.target.checked;
        setProdutos((prevProdutos) =>
          prevProdutos.map((product) => ({ ...product, selecionado: isChecked }))
        );
      };

      return (
        <div className="inventory-container">
          <div className="header">
            <h2>Controle de Estoque</h2>
          </div>
            <Acoes products={produtos} setProdutos={setProdutos} setSearchTerm={setSearchTerm} />
          <table className="inventory-table">
            <Header selecionaTodos={selecionaTodos} />
            <tbody>
              {productFiltred.map((product) => (
                <LinhaProduto
                  key={product.id}
                  product={product}
                  selecionaProduto={selecionaProduto}
                />
              ))}
            </tbody>
          </table>
        </div>
      );
    };
