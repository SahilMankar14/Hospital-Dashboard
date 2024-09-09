import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const LineChart = ({ startDate, endDate, chartData, loading }) => {
  // const [chartData, setChartData] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Make an HTTP request to the FastAPI endpoint
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://accountants-server.fly.dev/fetchanddisplaysalesipdopdpharmacy"
  //       );
  //       console.log("Sales IPD OPD Pharmacy", response.data);
  //       setChartData(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Extract x-axis and y-axis values from API data
  const xValues =
    chartData.length > 0 ? chartData.map((item) => item.xAxis) : [];
  const ipdValues =
    chartData.length > 0 ? chartData.map((item) => item.IPD) : [];
  const opdValues =
    chartData.length > 0 ? chartData.map((item) => item.OPD) : [];
  const pharmacyValues =
    chartData.length > 0 ? chartData.map((item) => item.Pharmacy) : [];

  // ApexCharts options
  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    plotOptions: {
      line: {
        colors: ["#4318FF", "#6AD2FF", "#3366FF"],
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#A3AED0",
          fontSize: "9px",
          fontWeight: "600",
        },
      },
      type: "text",
      range: undefined,
      categories: xValues,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#000000",
      },
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: "IPD",
      data: ipdValues,
      color: "#4318FF",
    },
    {
      name: "OPD",
      data: opdValues,
      color: "#6AD2FF",
    },
    {
      name: "Pharmacy",
      data: pharmacyValues,
      color: "#3366FF",
    },
  ];

  return loading ? (
    <div className="w-full h-full flex justify-center items-center">
      Loading......
    </div>
  ) : (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
