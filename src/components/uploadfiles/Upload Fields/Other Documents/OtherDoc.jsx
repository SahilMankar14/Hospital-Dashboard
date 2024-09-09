import React, { useState } from "react";
import "./OtherDoc.css";
import ArticleIcon from "@mui/icons-material/Article";
import SupabaseS3FileUpload from "../../SupabaseS3FileUpload";

const OtherDoc = ({ files, clearFile, userName, onDataChange, data }) => {
  const [dateRange, setDateRange] = useState(data.dateRange || "");
  const [remark, setRemark] = useState(data.remark || "");
  const [financialYear, setFinancialYear] = useState(data.financialYear || "");
  const [customStartDate, setCustomStartDate] = useState(
    data.customStartDate || ""
  );
  const [customEndDate, setCustomEndDate] = useState(data.customEndDate || "");
  const [filePath, setFilePath] = useState("");

  const handleDateRangeChange = (e) => {
    const selectedDateRange = e.target.value;
    setDateRange(selectedDateRange);
    onDataChange("dateRange", selectedDateRange);
    setCustomStartDate("");
    setCustomEndDate("");
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
    onDataChange("remark", e.target.value);
  };

  const handleFinancialYearChange = (e) => {
    const selectedYear = e.target.value;
    const [startYear, endYear] = selectedYear.split("-");
    const startDate = `${startYear}-04-01`;
    const endDate = `${endYear}-03-31`;

    console.log("Financial Year Start Date:", startDate);
    console.log("Financial Year End Date:", endDate);

    setFinancialYear(selectedYear);
    onDataChange("financialYear", { startDate, endDate });
  };

  const handleCustomStartDateChange = (e) => {
    const startDate = e.target.value;
    setCustomStartDate(startDate);
    onDataChange("customDates", { startDate, endDate: customEndDate });
  };

  const handleCustomEndDateChange = (e) => {
    const endDate = e.target.value;
    setCustomEndDate(endDate);
    onDataChange("customDates", { startDate: customStartDate, endDate });
  };

  const handleFilePath = (path) => {
    setFilePath(path);
    onDataChange("filePath", path);
  };

  return (
    <div className="main">
      <div className="upload-container-wrapper flex font-sans p-5">
        {/* Time Period Section */}
        <div className="section w-3/4 flex flex-col">
          <div className="flex">
            {" "}
            <h1 className="font-bold flex text-xl font-sans uppercase ">
              <ArticleIcon className="mr-3 h-7 w-7 flex" />
              Other Documents :
            </h1>
            <div className="options-container mt-1 mb-4 ">
              <div className="flex">
                {/* <p className='font-bold text-gray-700 text-l font-sans uppercase mb-3 mr-4'>Time Period:</p> */}
                <div className="options">
                  <label className="radio-option  text-gray-400 font-sans transition-colors hover:text-gray-700 mr-10 ml-4">
                    <input
                      type="radio"
                      name="dateRange"
                      value="financialYear"
                      checked={dateRange === "financialYear"}
                      onChange={handleDateRangeChange}
                    />
                    Financial Year
                  </label>
                  <label className="radio-option  text-gray-400 font-sans transition-colors hover:text-gray-700">
                    <input
                      type="radio"
                      name="dateRange"
                      value="customDates"
                      checked={dateRange === "customDates"}
                      onChange={handleDateRangeChange}
                    />
                    Custom Dates
                  </label>
                </div>
              </div>
              {dateRange === "customDates" && (
                <div className="custom-dates-field ml-4 text-gray-400 font-sans flex mt-2 ">
                  <div className="transition-colors hover:text-gray-700 flex">
                    <label htmlFor="startDate" className="mr-2">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={customStartDate}
                      onChange={handleCustomStartDateChange}
                    />
                  </div>
                  <div className="transition-colors hover:text-gray-700 flex ml-3">
                    <label htmlFor="endDate" className="mr-2">
                      End Date:
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={customEndDate}
                      onChange={handleCustomEndDateChange}
                    />
                  </div>
                </div>
              )}
              {dateRange === "financialYear" && (
                <div className="financial-year-dropdown text-gray-400 font-sans transition-colors hover:text-gray-700 ml-4 mt-2">
                  <select
                    value={financialYear}
                    onChange={handleFinancialYearChange}
                  >
                    <option value="">Select Financial Year</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2021-2022">2021-2022</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              )}
            </div>
          </div>
          {/* Upload File Section */}
          <SupabaseS3FileUpload
            userId={userName}
            section="OtherDocs"
            handleFilePath={handleFilePath}
          />
        </div>

        {/* Remarks Section */}
        <div className="section w-1/4 ml-4 flex flex-col">
          <label
            htmlFor="remark"
            className="font-bold text-gray-700 text-l font-sans uppercase"
          >
            Remark:
          </label>
          <div className="remark-container w-full">
            <textarea
              id="remark"
              name="remark"
              value={remark}
              onChange={handleRemarkChange}
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDoc;
