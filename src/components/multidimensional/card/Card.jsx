import React, { useEffect, useState } from "react";
// import Papa from 'papaparse';
import Widget from "./Widget";
import { MdFileDownload } from "react-icons/md";
import { IoFootstepsSharp } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";

function CardComponent() {
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://accountants-server.fly.dev/fetchanddisplay",
          {
            method: "POST",
          }
        );
        const data = await response.json();
        console.log("Multidimensional view card data:", data);
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchData();
  }, []);

  const iconMapping = {
    "best performing department": <FaBuilding className="h-6 w-6" />,
    "total footfall1": <IoFootstepsSharp className="h-7 w-7" />,
    "worst performing department": <FaBuilding className="h-6 w-6" />,
    "total footfall2": <IoFootstepsSharp className="h-6 w-6" />,
  };

  const downloadCSV = () => {
    if (!cardData) return; // If no data, return early

    const csvContent = [
      ["Label", "Value"], // Header row
      ...cardData.map((data) => [data.Label, data.Value]), // Data rows
    ]
      .map((e) => e.join(",")) // Join each row with commas
      .join("\n"); // Join all rows with new lines

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "card_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return loading ? (
    <div className="w-full text-center">Loading.......</div>
  ) : (
    <div className="App">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadCSV}
          className=" rounded-lg bg-white text-brand-500 hover:shadow-sm py-2 px-2"
        >
          <MdFileDownload className="h-6 w-6" />
        </button>
      </div>
      {/* Container for the widgets */}
      <div className="grid grid-cols-4 gap-4">
        {cardData &&
          cardData.map((data, index) => (
            <div key={index}>
              <Widget
                icon={iconMapping[data.Label]}
                title={data.Label}
                subtitle={data.Value}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardComponent;
