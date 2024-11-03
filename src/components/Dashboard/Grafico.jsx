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
      data: [30, 40, 45, 50, 49, 60, 70, 91],
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


