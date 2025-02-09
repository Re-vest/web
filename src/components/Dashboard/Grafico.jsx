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
      categories: vendas.map(venda => {return venda[0]}),
    },
    colors: ['#0d35fe']
  }

  const series = [
    {
      name: "series-1",
      data: vendas.map(venda => {return venda[1]})
    },
  ]

  const getVendasPorEvento = async (id) => {
    try {

        const response = await api.get(`/produtos/vendidos-por-dia?eventoId=${id}`)

        if(response.status !== 204) {
          setVendas(response.data)
          
        }
        else setVendas([[]])
        

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
            type="line"
            width="100%"
            height="300px"
          />
        </div>
      </div>
    </div>
  ) : <></>
};


