import React from "react";
import "./BStable.css";
import Heading1 from "./H1/heading1";
import Heading2 from "./H2/heading2";

const PLtable = ({ startDate, endDate, data }) => {
  const heading1Data = data.filter(
    (item, index) =>
      index < data.findIndex((obj) => obj.Particulars === "Sales Accounts")
  );
  console.log(heading1Data);

  // Filter the data array for Assets
  const heading2Data = data.filter(
    (item, index) =>
      index >= data.findIndex((obj) => obj.Particulars === "Sales Accounts")
  );
  console.log(heading2Data);

  return (
    <div className="relative PLtable-container-wrapper w-full font-sans flex shadow-lg p-5">
      <div className="section w-1/2  border p-5 border-gray-200">
        <div className="justify-between flex p-5">
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Heading1
          </p>
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Till Date: {endDate}
          </p>
        </div>
        <div className="p-5">
          <Heading1
            startDate={startDate}
            endDate={endDate}
            data={heading1Data}
          />
        </div>
      </div>

      <div className="section w-1/2  border p-5 border-gray-200">
        <div className="justify-between flex p-5">
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Heading2
          </p>
          <p className="font-bold text-gray-700 text-l font-sans uppercase">
            Till Date: {endDate}
          </p>
        </div>
        <div className="p-5">
          <Heading2
            startDate={startDate}
            endDate={endDate}
            data={heading2Data}
          />
        </div>
      </div>
    </div>
  );
};

export default PLtable;
