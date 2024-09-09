// BarChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ chartData, loading }) => {
  const generateChartOptions = (data) => ({
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      theme: "dark",
      onDatasetHover: {
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
    },
    xaxis: {
      categories: data.map((item) => item.Category),
      show: false,
      labels: {
        show: true,
        style: {
          colors: "#A3AED0",
          fontSize: "10px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "black",
      labels: {
        show: false,
        style: {
          colors: "#A3AED0",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
    },
    grid: {
      borderColor: "rgba(163, 174, 208, 0.3)",
      show: true,
      yaxis: {
        lines: {
          show: false,
          opacity: 0.5,
        },
      },
      row: {
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    },
    legend: {
      show: false,
    },
    colors: ["#5E37FF", "#6AD2FF", "#E1E9F8"],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "20px",
      },
    },
  });

  const generateChartSeries = (data) => [
    {
      name: "October",
      data: data.map((item) => item.October),
      color: "#6AD2FA",
    },
    {
      name: "December",
      data: data.map((item) => item.December),
      color: "#4318FF",
    },
    {
      name: "November",
      data: data.map((item) => item.November),
      color: "#EFF4FB",
    },
  ];

  const options = generateChartOptions(chartData);
  const series = generateChartSeries(chartData);

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      Loading...
    </div>
  ) : (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarChart;
