// PieChart.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';

const PieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  Papa.parse(import.meta.env.BASE_URL + "PieChartData.csv", {
    download: true,
    header: true,
    complete: (result) => {
      const parsedData = result.data;
      setChartData(parsedData);

      const chartOptions = {
        labels: parsedData.map((item) => item.Label),
        colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        chart: {
          type: "pie",
          width: "50px",
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        hover: { mode: null },
        plotOptions: {
          donut: {
            expandOnClick: false,
            donut: {
              labels: {
                show: false,
              },
            },
          },
        },
        fill: {
          colors: ["#4318FF", "#6AD2FF", "#EFF4FB"],
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          style: {
            fontSize: "12px",
            fontFamily: undefined,
            backgroundColor: "#000000",
          },
        },
      };

      const chartSeries = parsedData.map((item) => parseInt(item.Value, 10));


      setOptions(chartOptions);
      setSeries(chartSeries);
      setLoading(false);
    },
  });
}, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Chart options={options} series={series} type="pie" width="100%" />
  );
};

export default PieChart;
