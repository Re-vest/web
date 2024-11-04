import React, { useState } from "react";
import Chart from "react-apexcharts";

export const Grafico = ({ semana }) => {
  console.log(semana)
  const [options] = useState({
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: semana,
    },
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [25, 20, 15, 7, 7, 15, 20, 25],
    },
  ]);

  return (
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
  );
};


