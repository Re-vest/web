import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import api from "../../api";

const DashCategoria = ({
  events = [],
  currentIndex = 0
}) => {

  const [chartData, setChartData] = useState({ categories: [], data: [] }); 

  const getRankingTipo = async () => {

    const response = await api.get(`vendas/categorias-mais-vendidas?eventoId=${events[currentIndex].id}`)

    if(response.status === 200) {
      let categories = []
      let data = []
  
      response.data.map(tipo => {
        categories.push(tipo.categoria)
        data.push(tipo.quantidade)
      })
  
      setChartData({
        categories,
        data: data
      })

    } else {
      setChartData({ categories: [], data: [] })
    }

  }

  useEffect(() => {
    getRankingTipo()
  }, [events, currentIndex])
  

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "10px", // Ajuste fino da altura das barras
        dataLabels: {
          position: "top", // Posiciona os valores ao final da barra
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"], // Cor dos valores à direita
        fontWeight: "bold",
        marginTop: 100, // Afastamento dos valores
      },
      formatter: (val) => val, // Garante que os valores apareçam corretamente
      offsetY: -12, // Pequeno ajuste no posicionamento
    },
    xaxis: {
      categories: chartData.categories,
      labels: { show: false }, // Oculta os valores do eixo X
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000", // Cor do texto das categorias
          fontWeight: "bold",
          fontSize: "14px",
          margin: 100, // Afastamento do eixo Y
        },
      },
    },
    grid: {
      show: false, // Remove linhas de grade
    },
    colors: ["#facc15"], // Cor das barras
  };

  const series = [
    {
      name: "Quantidade",
      data: chartData.data,
    },
  ];

  return (
    <div style={{ marginLeft: "50px", }}> {/* Adiciona margem ao redor do gráfico */}
      <h3 style={{ fontWeight: "bold", fontSize: 18, marginTop: "5px"}}>Top 5 Categorias desse Evento</h3>
      {chartData.categories.length > 0 ? (
        <Chart options={options} series={series} type="bar" height={250} />
      ) : (
        <p>Nenhum produto vendido no evento</p>
      )}
    </div>
  );
};

export default DashCategoria;
