import React from "react";
import "./BStable.css";
import Liabilities from "./Liabilities/Liabilities";
import Asset from "./Asset/Asset";

const BStable = ({ startDate, endDate, data }) => {
  // Filter the data array for Liabilities
  const liabilitiesData = data.filter(
    (item, index) =>
      index < data.findIndex((obj) => obj.Category === "Fixed Assets")
  );
  console.log(liabilitiesData);

  // Filter the data array for Assets
  const assetsData = data.filter(
    (item, index) =>
      index >= data.findIndex((obj) => obj.Category === "Fixed Assets")
  );
  console.log(assetsData);

  return (
    <div className="relative BStable-container-wrapper w-full font-sans flex shadow-lg">
      <div className="section w-1/2  border p-5 border-gray-200">
        <div className="justify-between flex p-5">
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Liabilities
          </p>
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Till Date: {endDate}
          </p>
        </div>
        <div className="p-5">
          <Liabilities
            startDate={startDate}
            endDate={endDate}
            data={liabilitiesData}
          />
        </div>
      </div>

      <div className="section w-1/2  border p-5 border-gray-200">
        <div className="justify-between flex p-5">
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Assets
          </p>
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Till Date: {endDate}
          </p>
        </div>
        <div className="p-5">
          <Asset startDate={startDate} endDate={endDate} data={assetsData} />
        </div>
      </div>
    </div>
  );
};

export default BStable;
