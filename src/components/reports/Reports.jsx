import React, { useState } from "react";
import "./Reports.css"; // Importing custom CSS if needed
import BStable from "./Tables/BStable"; // Importing the Table component
import PLtable from "./Tables/PLtable"; // Importing the Table component
import Accordion from "./Accordian"; // Importing the Accordion component

const Reports = () => {
  // State variables for start date and end date
  const [startDateBs, setStartDateBs] = useState("");
  const [endDateBs, setEndDateBs] = useState("");
  const [startDatePl, setStartDatePl] = useState("");
  const [endDatePl, setEndDatePl] = useState("");
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [profitAndLossData, setProfitAndLossData] = useState([]);

  // Function to handle form submission
  const handleBSSubmit = async (e) => {
    e.preventDefault();

    // Convert date strings to yyyy-mm-dd format
    const formattedStartDate = startDateBs.replaceAll("-", "");
    const formattedEndDate = endDateBs.replaceAll("-", "");

    // Convert yyyy-mm-dd format to integer (yyyymmdd)
    const startDateInt = parseInt(formattedStartDate);
    const endDateInt = parseInt(formattedEndDate);

    // Send start date and end date to backend
    const response = await fetch(
      `http://127.0.0.1:8000/balance-sheet/?from_date=${startDateInt}&to_date=${endDateInt}`
    );
    const data = await response.json();
    console.log(data); // Logging response data to the console
    setBalanceSheetData(data); // Setting the fetched data to state
  };

  const handlePLSubmit = async (e) => {
    e.preventDefault();

    // Convert date strings to yyyy-mm-dd format
    const formattedStartDate = startDatePl.replaceAll("-", "");
    const formattedEndDate = endDatePl.replaceAll("-", "");

    // Convert yyyy-mm-dd format to integer (yyyymmdd)
    const startDateInt = parseInt(formattedStartDate);
    const endDateInt = parseInt(formattedEndDate);

    // Send start date and end date to backend
    const response = await fetch(
      `http://127.0.0.1:8000/plsheet/?from_date=${startDateInt}&to_date=${endDateInt}`
    );
    const data = await response.json();
    console.log(data); // Logging response data to the console
    setProfitAndLossData(data); // Setting the fetched data to state
  };

  return (
    <div className="main mt-4">
      {/* Balance sheet accordion */}
      <Accordion title="Balance Sheet">
        <div className="relative report-container-wrapper w-full h-full font-sans p-5 shadow-lg">
          <h1 className="font-bold text-gray-700 text-xl font-sans uppercase p-5">
            Balance Sheet
          </h1>
          {/* Form for selecting time period */}
          <form onSubmit={handleBSSubmit}>
            <div className="flex">
              <p className="font-bold text-gray-700 text-l font-sans uppercase mr-3 mt-2 ml-5">
                Time Period:
              </p>
              <div className="date-pickers text-gray-400 font-sans transition-colors hover:text-gray-700">
                {/* Start Date input */}
                <label htmlFor="start-date" className="mr-3">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  className="mr-3"
                  value={startDateBs}
                  onChange={(e) => setStartDateBs(e.target.value)}
                />
                {/* End Date input */}
                <label htmlFor="end-date" className="mr-3">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  className="mr-3"
                  value={endDateBs}
                  onChange={(e) => setEndDateBs(e.target.value)}
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-purple-600 text-white rounded-lg p-2 w-20 font-sans font-bold"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          {/* Rendering the Table component and passing the endDate prop */}
          <div className="Tables">
            <BStable
              startDate={startDateBs}
              endDate={endDateBs}
              data={balanceSheetData}
            />
          </div>
        </div>
      </Accordion>

      {/* Profit and Loss accordion */}
      <Accordion title="Profit and Loss">
        <div className="relative report-container-wrapper w-full h-full font-sans p-5 shadow-lg">
          <h1 className="font-bold text-gray-700 text-xl font-sans uppercase p-5">
            Profit and Loss
          </h1>
          {/* Form for selecting time period */}
          <form onSubmit={handlePLSubmit}>
            <div className="flex">
              <p className="font-bold text-gray-700 text-l font-sans uppercase mr-3 mt-2 ml-5">
                Time Period:
              </p>
              <div className="date-pickers text-gray-400 font-sans transition-colors hover:text-gray-700">
                {/* Start Date input */}
                <label htmlFor="start-date" className="mr-3">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  className="mr-3"
                  value={startDatePl}
                  onChange={(e) => setStartDatePl(e.target.value)}
                />
                {/* End Date input */}
                <label htmlFor="end-date" className="mr-3">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  className="mr-3"
                  value={endDatePl}
                  onChange={(e) => setEndDatePl(e.target.value)}
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-purple-600 text-white rounded-lg p-2 w-20 font-sans font-bold"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          {/* Rendering the Table component and passing the endDate prop */}
          <div className="Tables">
            <PLtable
              startDate={startDatePl}
              endDate={endDatePl}
              data={profitAndLossData}
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default Reports;
