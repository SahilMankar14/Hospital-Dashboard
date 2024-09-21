import React, { useState, useEffect } from "react";
import PatientMasterForm from "./Forms/PatientMasterForm";
import DoctorMasterForm from "./Forms/DoctorMasterForm";
import BillingForm from "./Forms/BillingForm";
import OperatorMasterForm from "./Forms/OperatorMasterForm";
import PanelMasterForm from "./Forms/PanelMasterForm";
import useCompanyData from "../../hooks/useCompanyData";

const BillingSystem = () => {
  const [selectedForm, setSelectedForm] = useState("PatientMasterForm");
  const [companyId, setCompanyId] = useState(1);
  const { companies, userEmail, error } = useCompanyData();

  useEffect(() => {
    // console.log("Company id:", companies[0].company_id);
    // setCompanyId(companies[0].company_id);
  }, []);

  const handleChange = (event) => {
    setSelectedForm(event.target.value);
  };

  return (
    <div>
      <div
        className="dropdown"
        style={{
          position: "absolute",
          top: "80px",
          right: "10px",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#fff",
          transition: "background-color 0.3s",
        }}
      >
        <select
          value={selectedForm}
          onChange={handleChange}
          style={{ border: "none", outline: "none" }}
        >
          <option value="PatientMasterForm">Patient Master Form</option>
          <option value="DoctorMasterForm">Doctor Master Form</option>
          <option value="BillingForm">Billing Form</option>
          <option value="OperatorMasterForm">Operator Master Form</option>
          <option value="PanelMasterForm">Panel Master Form</option>
        </select>
      </div>
      <div className="master-form" style={{ marginTop: "10px" }}>
        {/* Added margin top */}
        {selectedForm === "PatientMasterForm" && (
          <PatientMasterForm companyId={companyId} />
        )}
        {selectedForm === "DoctorMasterForm" && (
          <DoctorMasterForm companyId={companyId} />
        )}
        {selectedForm === "BillingForm" && (
          <BillingForm companyId={companyId} />
        )}
        {selectedForm === "OperatorMasterForm" && (
          <OperatorMasterForm companyId={companyId} />
        )}
        {selectedForm === "PanelMasterForm" && (
          <PanelMasterForm companyId={companyId} />
        )}
      </div>
    </div>
  );
};

export default BillingSystem;
