import { useState, useEffect } from "react";
import Card from "../utils/card";
import BarChart from "./BarChart";
import { MdFileDownload } from "react-icons/md";
import axios from "axios";

const Chart2 = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://accountants-server.fly.dev/stocksummary"
        );
        const parsedData = response.data;
        console.log("stock summary parsed data:", parsedData);

        const modifiedData = parsedData.map((item) => ({
          ...item,
          Category: item.Category.split(" "), // Split Category on whitespace
        }));

        console.log("stock summary modified data:", modifiedData);

        setChartData(modifiedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    if (!chartData.length) return; // If no data, return early

    const csvContent = [
      ["Category", "October", "November", "December"], // Header row
      ...chartData.map((item) => [
        item.Category.join(" "), // Join the category array back into a string
        item.October,
        item.November,
        item.December,
      ]),
    ]
      .map((e) => e.join(",")) // Join each row with commas
      .join("\n"); // Join all rows with new lines

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Weekly Revenue
        </h2>
        <button
          onClick={downloadCSV}
          className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
        >
          <MdFileDownload className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart chartData={chartData} loading={loading} />
        </div>
      </div>
    </Card>
  );
};

export default Chart2;
