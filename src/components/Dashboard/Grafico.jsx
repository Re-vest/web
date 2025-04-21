  import React, { useEffect, useState } from "react";
  import Chart from "react-apexcharts";
  import api from "../../api";

  export const Grafico = ({ events, currentIndex }) => {
    const [vendas, setVendas] = useState([])

    const options = {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: vendas.map(venda => new Date(venda[0] + 'T00:00:00').toLocaleDateString('pt-BR')),
      },
      colors: ['#0D35FE'],
      plotOptions: {
        bar: {
          columnWidth: '50',  
        },
      },  
    }

    const series = [
      {
        name: "Quantidade de Produtos Vendidos",
        data: vendas.map(venda => venda[1])
      },
    ]

    const getVendasPorEvento = async (id) => {
      try {

          const response = await api.get(`/produtos/vendidos-por-dia?eventoId=${id}`)

          if(response.status !== 204) {
            setVendas(response.data.slice(-7))
            
          }
          else setVendas([['', 0]])

      } catch (e) {
        console.log(e);
      }
    }

    useEffect(() => {
      if(events.length > 0) getVendasPorEvento(events[currentIndex].id)
    }, [events, currentIndex])

    return vendas.length > 0 ? (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="100%"
              height="300px"
            />
          </div>
        </div>
      </div>
    ) : <></>
  };


