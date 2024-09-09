import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UploadFiles.css";
import BalanceSheet from "./Upload Fields/BalanceSheet/BalanceSheet";
import Sales from "./Upload Fields/Sales/Sales";
import Purchase from "./Upload Fields/Purchase/Purchase";
import BankStatement from "./Upload Fields/Bank Statement/BankStatement";
import AS from "./Upload Fields/26 AS/AS";
import GSTLedger from "./Upload Fields/GST Ledger/GSTLedger";
import CashBooks from "./Upload Fields/Cash Books/CashBooks";
import Journal from "./Upload Fields/Journal/Journal";
import OtherDocs from "./Upload Fields/Other Documents/OtherDoc";
import { supabase } from "../../supabaseClient";

const MainComponent = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState({
    balanceSheet: {},
    sales: {},
    purchase: {},
    bankStatement: {},
    as_data: {},
    gstLedger: {},
    cashBooks: {},
    journal: {},
    otherDocs: {},
    company_id: null,
  });

  // Company id is not getting updated properly need to work on this
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && session.user) {
          const userEmail = session.user.email;
          setUserName(userEmail);

          // Fetch company id
          const response = await axios.get(
            `http://127.0.0.1:8000/company/${userEmail}`
          );

          let fetchedCompanyId = null;
          if (response.data.length > 0) {
            fetchedCompanyId = response.data[0].company_id;
          }

          console.log("Company id:", fetchedCompanyId);

          setData((prevData) => ({
            ...prevData,
            company_id: fetchedCompanyId,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  const clearFile = () => {
    setFiles([]);
    setFileName("");
  };

  const handleUpload = async () => {
    // Check if companyId is present
    if (!data.company_id) {
      console.error("Company ID is missing, cannot upload.");
      return;
    }

    console.log("Company ID before upload:", data.company_id);

    const formData = data;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/data",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDataChange = (componentName, fieldName, value) => {
    setData((prevData) => ({
      ...prevData,
      [componentName]: {
        ...prevData[componentName],
        [fieldName]: value,
      },
    }));
  };

  return (
    <>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <BalanceSheet
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("balanceSheet", field, value)
          }
          data={data.balanceSheet}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <Sales
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("sales", field, value)
          }
          data={data.sales}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <Purchase
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("purchase", field, value)
          }
          data={data.purchase}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <BankStatement
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("bankStatement", field, value)
          }
          data={data.bankStatement}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <AS
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("as_data", field, value)
          }
          data={data.as_data}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <GSTLedger
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("gstLedger", field, value)
          }
          data={data.gstLedger}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <CashBooks
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("cashBooks", field, value)
          }
          data={data.cashBooks}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <Journal
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("journal", field, value)
          }
          data={data.journal}
        />
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-container ${dragging ? "dragging" : ""}`}
      >
        <OtherDocs
          files={files}
          clearFile={clearFile}
          userName={userName}
          onDataChange={(field, value) =>
            handleDataChange("otherDocs", field, value)
          }
          data={data.otherDocs}
        />
      </div>

      <div className="button-container">
        <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );
};

export default MainComponent;
