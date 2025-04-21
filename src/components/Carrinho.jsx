import swal from 'sweetalert';
import estoque from '../styles/estoque.module.css'
import { DatePicker } from 'rsuite';
import Select from "react-select";
import notFound from "../assets/notFound.png";
import { Button } from "./Button";
import { CardProduto } from "./CardProduto";
import { useContext, useEffect, useState } from 'react';
import api from '../api'
import { UserContext } from '../Contexts/UserContext';


export function Carrinho({
  produtosSelecionados,
  setProdutos,
  setProdutosSelecionados,
  setOpenCarrinho
}) {
  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState({});
  const [totalCarrinho, setTotalCarrinho] = useState(0);
  const [date, setDate] = useState(new Date());
  const { user } = useContext(UserContext)

  useEffect(() => {
    setTotalCarrinho(
      produtosSelecionados.reduce(
        (acc, produtoAtual) => acc + produtoAtual.preco,
        0
      )
    );
  }, [produtosSelecionados]);

  let opcoesCarrinhos = [];

  useEffect(() => {
    api.get("/eventos/eventos-ativos").then((response) => {
      response.data.map((event) => {
        opcoesCarrinhos.push({ label: event.titulo, value: event.id, dataInicio: event.dataInicio, dataFim: event.dataFim });
      });
      if (response.status !== 204) {
        setEventos(opcoesCarrinhos);
        setEventoSelecionado(opcoesCarrinhos[0]);
      }
      //console.log(eventos);
    });
  }, [])

  const realizarVenda = async () => {
    if (produtosSelecionados.length === 0) {
      swal("Erro", "Selecione ao menos um produto para realizar a venda", "error");
      return;
    }

    let dataSelecionada = date;
    dataSelecionada.setHours(0,0,0,0)
    console.log(dataSelecionada);

    let dataAtual = new Date();
    dataAtual.setHours(0,0,0,0)

    let dateInicioEvento = new Date(eventoSelecionado.dataInicio + "T00:00:00")

    let dateFimEvento = new Date(eventoSelecionado.dataFim + "T00:00:00")

    if(eventoSelecionado.value === null || eventoSelecionado.value === undefined) {
      swal("Erro", "Ocorreu um erro ao realizar a venda, selecione um evento", "error");
      return
    }

    if (dataSelecionada == null) {
      swal("Erro", "Selecione uma data", "error");
      return;
    }

    if (dataSelecionada > dataAtual) {
      swal("Erro", "Não pode selecionar uma data futura", "error");
      return
    }

    if (dataSelecionada < dateInicioEvento || dataSelecionada > dateFimEvento) {
      swal("Erro", "A data selecionada está fora do intervalo de tempo do evento", "error");
      return
    }

    try {
      const response = await api.post(
        `/vendas?idUsuario=${sessionStorage.ID_USER}`,
        {
          produtosId: produtosSelecionados.map((produto) => produto.id),
          idEvento: eventoSelecionado.value,
          idVendedor: sessionStorage.ID_USER,
          date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2, '0')}`
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setProdutos((prevProdutos) =>
          prevProdutos.map((produto) =>
            produtosSelecionados.some((p) => p.id === produto.id)
              ? { ...produto, status: "VENDIDO" }
              : produto
          )
        );

        setProdutosSelecionados([]);
        setOpenCarrinho(false);

        swal("Venda Confirmada", "Você realizou uma venda com sucesso!", "success");
      }
    } catch (error) {
      console.log(error);

      swal("Erro", "Ocorreu um erro ao realizar a venda, selecione um evento", "error");
    }
  };

  const cancelarVenda = () => {
    setProdutosSelecionados([]);
    setOpenCarrinho(false);
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => ({
        ...produto,
        checked: false,
      }))
    );
  };


  

  return (
    <div className={estoque["carrinho"]}>
      <div className={estoque["produtosCarrinho"]}>
        {produtosSelecionados.map((product) => (
          <CardProduto
            key={product.id}
            image={product.imagem ? product.imagem.urlImagem : notFound}
            nome={product.nome}
            preco={product.preco.toFixed(2)}
          />
        ))}
      </div>
      <div className={estoque["informacaoCarrinho"]}>
        <div className={estoque["eventoCarrinho"]}>
          <span>Evento:</span>
          <div className="w-1/2">
            <Select
              value={eventoSelecionado}
              placeholder="Selecionar"
              onChange={(e) => setEventoSelecionado(e)}
              options={eventos}
              styles={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="flex w-full items-center justify-between">
          <span>
            {
              eventoSelecionado.dataInicio ? (
                new Date(eventoSelecionado.dataInicio + 'T00:00:00').toLocaleDateString('pt-BR')
              ) : <p></p>
            }
          </span>
          <span>-</span>
          <span>
            {
              eventoSelecionado.dataFim ? (
                new Date(eventoSelecionado.dataFim + 'T00:00:00').toLocaleDateString('pt-BR')
              ) : <p></p>
            }
          </span>
        </div>

        <div className={estoque["eventoCarrinho"]}>
          <span>Data:</span>
          <DatePicker value={date} placeholder="Selecionar data" size='lg' onChange={(e) => {
            setDate(e ? e : new Date())
          }} />
        </div>

        <div className={estoque["valorCarrinho"]}>
          <span>Valor Total:</span>
          <span className='text-xl font-bold'>R$ {totalCarrinho.toFixed(2)}</span>
        </div>
        <div className={estoque["finalCarrinho"]}>
          <Button
            text={"Registrar Venda"}
            onClick={() => realizarVenda(false)}
            secondary
          />
          <Button text={"Cancelar"} onClick={() => cancelarVenda()} />
        </div>
      </div>
    </div>
  )
}