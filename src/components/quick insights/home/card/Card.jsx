import React, { useEffect, useState } from "react";
import axios from "axios";
// import Papa from 'papaparse';
import Widget from "./Widget";
import {
  MdDashboard,
  MdBarChart,
  MdHome,
  MdBook,
  MdAccountBalance,
  MdCloudUpload,
  MdDirectionsCar,
  MdLocalGroceryStore,
  MdFileDownload,
} from "react-icons/md";

function CardComponent() {
  const [cardData, setCardData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // #--------------------------------To Test mulltiple user login endpoint-----------------------------#

  // const email = "raghavmundhra.edu@gmail.com";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://127.0.0.1:8000/company/${email}`
  //       );
  //       console.log("Companies:", response.data);
  //       if (response.data.length > 0) {
  //         handleCompanySelect(response.data[0].company_id);
  //       }
  //       setCompanies(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching card data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [email]);

  // const handleCompanySelect = async (companyId) => {
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/get_values_using_companyid",
  //       {
  //         start_date: "2023-04-01",
  //         end_date: "2024-03-31",
  //         company_id: companyId,
  //       }
  //     );
  //     console.log("Card Data:", response.data);
  //     setCardData(response.data);
  //   } catch (error) {
  //     console.error("There was an error fetching the company info!", error);
  //   }
  // };

  // #--------------------------------To Test tally-database-loader endpoint-----------------------------#

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://accountants-server.fly.dev/get_all_cards",
          {
            method: "POST",
          }
        );
        const data = await response.json();
        console.log("Quick Insight card data:", data);
        setCardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching card data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const iconMapping = {
    "Total Footfall": <MdDashboard className="h-6 w-6" />,
    "Average Revenue Per Patient": <MdBarChart className="h-7 w-7" />,
    "Median Revenue Per Patient": <MdHome className="h-6 w-6" />,
    "Operating Cost": <MdBook className="h-6 w-6" />,
    EBIDTA: <MdAccountBalance className="h-6 w-6" />,
    "Total Revisits": <MdCloudUpload className="h-6 w-6" />,
    "Daily Running Cost": <MdDirectionsCar className="h-6 w-6" />,
    "Operating Profits": <MdLocalGroceryStore className="h-6 w-6" />,
  };

  const formatNumber = (value, addRupeeSymbol = false) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedValue = formatter.format(value);
    return addRupeeSymbol ? `₹ ${formattedValue}` : formattedValue;
  };

  // --------Round off to nearest abbrevation-------- //

  // const formatNumber = (value, addRupeeSymbol = false) => {
  //   let formattedValue;

  //   if (value >= 1e7) {
  //     formattedValue = (value / 1e7).toFixed(2) + " Cr";
  //   } else if (value >= 1e5) {
  //     formattedValue = (value / 1e5).toFixed(2) + " Lc";
  //   } else if (value >= 1e3) {
  //     formattedValue = (value / 1e3).toFixed(2) + " K";
  //   } else {
  //     formattedValue = value.toFixed(2);
  //   }

  //   return addRupeeSymbol ? `₹${formattedValue}` : formattedValue;
  // };

  const shouldAddRupeeSymbol = (label) => {
    const labelsWithRupeeSymbol = [
      "Average Revenue Per Patient",
      "Median Revenue Per Patient",
      "Operating Cost",
      "EBIDTA",
      "Daily Running Cost",
      "Operating Profits",
    ];
    return labelsWithRupeeSymbol.includes(label);
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
    <div className="w-full text-center">Loading......</div>
  ) : (
    <div className="App">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadCSV}
          className=" rounded-lg bg-white text-brand-500 hover:shadow-sm py-2 px-2 "
        >
          <MdFileDownload className="h-6 w-6" />
        </button>
      </div>
      {/* Container for the widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {cardData &&
          cardData.map((data, index) => (
            <div key={index}>
              <Widget
                icon={iconMapping[data.Label]}
                title={data.Label}
                subtitle={formatNumber(
                  data.Value,
                  shouldAddRupeeSymbol(data.Label)
                )} // Intl.NumberFormat library
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardComponent;
