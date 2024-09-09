import React, { useState, useEffect, useRef } from "react";
import {
  MdArrowDropUp,
  MdOutlineCalendarToday,
  MdFileDownload,
} from "react-icons/md";
import Card from "../utils/card";
import LineChart from "./LineChart";
import DatePopover from "../popover/DatePopover";
import axios from "axios";

// Helper function to format the date as "yyyy/mm/dd"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
  return `${year}-${month}-${day}`;
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [startDate, setStartDate] = useState("2023-04-01");
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  // pop over dynamic position
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    console.log("startDate", startDate, "type", typeof startDate);
    console.log("endDate", endDate, "type", typeof endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    // Make an HTTP request to the FastAPI endpoint
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://accountants-server.fly.dev/fetchanddisplaysalesipdopdpharmacy"
        );
        console.log("Sales IPD OPD Pharmacy", response.data);
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [chartData]);

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  // pop over dynamic position
  const handleButtonClick = () => {
    if (buttonRef.current && chartRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const chartRect = chartRef.current.getBoundingClientRect();

      setPopoverPosition({
        top: buttonRect.bottom - chartRect.top,
        left: buttonRect.left - chartRect.left,
      });
      setShowPopover((prev) => !prev);
    }
  };

  const downloadCSV = () => {
    if (chartData.length > 0) {
      const csvData = [
        ["Month", "IPD", "OPD", "Pharmacy"],
        ...chartData.map(({ xAxis, IPD, OPD, Pharmacy }) => [
          xAxis,
          IPD,
          OPD,
          Pharmacy,
        ]),
      ];

      console.log("csvData:", csvData);

      const csvContent = csvData.map((row) => row.join(",")).join("\n");

      console.log("csvContent:", csvContent);

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card extra="!p-[20px] text-center flex flex-col h-full">
      {/*  // pop over dynamic position */}
      <div ref={chartRef} className="relative">
        <div className="flex justify-between">
          <button
            // pop over dynamic position
            ref={buttonRef}
            onClick={handleButtonClick}
            // onClick={() => setShowPopover(!showPopover)}
            className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80"
          >
            <MdOutlineCalendarToday />
            <span className="text-sm font-medium text-gray-600">
              This month
            </span>
          </button>
          <button
            onClick={downloadCSV}
            className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          >
            <MdFileDownload className="h-6 w-6" />
          </button>
        </div>

        {showPopover && (
          <DatePopover
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            onClose={handleClosePopover}
            // pop over dynamic position
            position={popoverPosition}
          />
        )}
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          <p className="mt-[20px] text-xl font-bold text-navy-700 dark:text-white">
            ₹37.5K
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-xs text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              <MdArrowDropUp className="font-medium text-green-500" />
              <p className="text-xs font-bold text-green-500"> +2.45% </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full flex-grow">
          <LineChart
            startDate={startDate}
            endDate={endDate}
            chartData={chartData}
            loading={loading}
          />
        </div>
      </div>
    </Card>
  );
};

export default Chart;
