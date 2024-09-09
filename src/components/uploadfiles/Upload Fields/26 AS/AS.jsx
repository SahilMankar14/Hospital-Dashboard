import React, { useState } from "react";
import "./AS.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SupabaseS3FileUpload from "../../SupabaseS3FileUpload";

const AS = ({ files, clearFile, userName, onDataChange, data }) => {
  const [formData, setFormData] = useState({
    dateRange: data.dateRange || "",
    remark: data.remark || "",
    financialYear: data.financialYear || "",
    id: data.id || "",
    password: data.password || "",
    customStartDate: data.customStartDate || "",
    customEndDate: data.customEndDate || "",
    selectedIdOption: data.selectedIdOption || "IDPass",
    filePath: data.filePath || "",
  });

  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   const componentName = "as";
  //   onDataChange(componentName, formData);
  // };

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onDataChange(name, value);
  };

  const handleDateRangeChange = (e) => {
    const selectedDateRange = e.target.value;
    handleInputChange("dateRange", selectedDateRange);
    // onDataChange("dateRange", selectedDateRange);
    handleInputChange("customStartDate", ""); // Reset custom dates
    handleInputChange("customEndDate", "");
  };

  const handleIdOptionChange = (e) => {
    const selectedIdOption = e.target.value;
    handleInputChange("selectedIdOption", selectedIdOption);
    handleInputChange("id", ""); // Reset ID
    handleInputChange("password", ""); // Reset password
  };

  const handleIdChange = (e) => {
    const id = e.target.value;
    handleInputChange("id", id);
    // onDataChange("id", e.target.value);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    handleInputChange("password", password);
    // onDataChange("password", e.target.value);
  };

  const handleRemarkChange = (e) => {
    const remark = e.target.value;
    handleInputChange("remark", remark);
    // onDataChange("remark", e.target.value);
  };

  const handleCustomStartDateChange = (e) => {
    const startDate = e.target.value;
    handleInputChange("customStartDate", startDate);
    // onDataChange("customDates", { startDate, endDate: customEndDate });
  };

  const handleCustomEndDateChange = (e) => {
    const endDate = e.target.value;
    handleInputChange("customEndDate", endDate);
    // onDataChange("customDates", { startDate: customStartDate, endDate });
  };

  const handleFinancialYearChange = (e) => {
    const selectedYear = e.target.value;
    const [startYear, endYear] = selectedYear.split("-");
    const startDate = `${startYear}-04-01`;
    const endDate = `${endYear}-03-31`;

    console.log("Financial Year Start Date:", startDate);
    console.log("Financial Year End Date:", endDate);

    handleInputChange("financialYear", selectedYear);
    // onDataChange("financialYear", { startDate, endDate });
  };

  const handleFilePath = (path) => {
    handleInputChange("filePath", path);
  };

  return (
    <div className="main">
      <div className="upload-container-wrapper flex font-sans p-5">
        <div className="section w-3/4 flex flex-col">
          <div className="flex">
            <h1 className="font-bold flex text-xl font-sans uppercase ">
              <VpnKeyIcon className="mr-3 h-7 w-7 flex" />
              26 AS
            </h1>
            <div className="options-container mt-1 mb-4 ">
              <div className="flex">
                <div className="options">
                  <label className="radio-option  text-gray-400 font-sans transition-colors hover:text-gray-700 mr-10 ml-4">
                    <input
                      type="radio"
                      name="dateRange"
                      value="financialYear"
                      checked={formData.dateRange === "financialYear"}
                      onChange={handleDateRangeChange}
                    />
                    Financial Year
                  </label>
                  <label className="radio-option  text-gray-400 font-sans transition-colors hover:text-gray-700">
                    <input
                      type="radio"
                      name="dateRange"
                      value="customDates"
                      checked={formData.dateRange === "customDates"}
                      onChange={handleDateRangeChange}
                    />
                    Custom Dates
                  </label>
                </div>
              </div>
              {formData.dateRange === "customDates" && (
                <div className="custom-dates-field ml-4 text-gray-400 font-sans flex mt-2 ">
                  <div className="transition-colors hover:text-gray-700 flex">
                    <label htmlFor="startDate" className="mr-2">
                      Start Date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.customStartDate}
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
                      value={formData.customEndDate}
                      onChange={handleCustomEndDateChange}
                    />
                  </div>
                </div>
              )}
              {formData.dateRange === "financialYear" && (
                <div className="financial-year-dropdown text-gray-400 font-sans transition-colors hover:text-gray-700 ml-4 mt-2">
                  <select
                    value={formData.financialYear}
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

          <div className="flex">
            <p className="font-bold text-gray-700 text-l font-sans uppercase mb-3">
              ID/Pass:
            </p>
            <div className="options-container1">
              <div className="options ml-4 mb-3">
                <label className="radio-option mr-20 ml-2 text-gray-400 font-sans transition-colors hover:text-gray-700">
                  <input
                    type="radio"
                    name="IDPass"
                    value="IDPass"
                    checked={formData.selectedIdOption === "IDPass"}
                    onChange={handleIdOptionChange}
                  />
                  ID/Pass
                </label>
                <label className="radio-option text-gray-400 font-sans transition-colors hover:text-gray-700">
                  <input
                    type="radio"
                    name="IDPass"
                    value="fileupload"
                    placeholder=""
                    checked={formData.selectedIdOption === "fileupload"}
                    onChange={handleIdOptionChange}
                  />
                  File Upload
                </label>
              </div>
            </div>
          </div>
          {formData.selectedIdOption === "IDPass" && (
            <div className="ID-Pass-field mb-4 ml-14 text-gray-400 font-sans flex">
              <div className="transition-colors hover:text-gray-700">
                <label className="mr-2">ID:</label>
                <input
                  type="text"
                  placeholder="Enter ID"
                  className="ml-4  w-20"
                  value={formData.id}
                  onChange={handleIdChange}
                />
              </div>
              <div className="transition-colors hover:text-gray-700">
                <label className="ml-2 mr-2">Password:</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="ml-4 w-25"
                  pattern="^[0-9]+$"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          )}
          {/* Upload File Section */}
          <SupabaseS3FileUpload
            userId={userName}
            section="26AS"
            handleFilePath={handleFilePath}
          />
        </div>

        {/* Remarks Section */}
        <div className="section w-1/4 ml-4 mt-9 flex flex-col">
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
              value={formData.remark}
              onChange={handleRemarkChange}
              className="mt-5"
            />
          </div>
          {/* <Button variant="contained" onClick={handleUpload}>
            Contained
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default AS;
