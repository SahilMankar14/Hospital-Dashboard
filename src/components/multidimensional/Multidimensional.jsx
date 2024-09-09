import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faChartBar,
  faCog,
} from "@fortawesome/free-solid-svg-icons"; // Import the required icons
import "./Multidimensional.css"; // CSS file name should match the import
import CenterWise from "./centerwise/CenterWise";
import CustomerWise from "./customerwise/CustomerWise";
import SegmentWise from "./segmentwise/SegmentWise";
import ServiceWise from "./servicewise/ServiceWise";

const TabContent = ({ tab }) => {
  switch (tab) {
    case "CenterWise":
      return <CenterWise />;
    case "CustomerWise":
      return <CustomerWise />;
    case "SegmentWise":
      return <SegmentWise />;
    case "ServiceWise":
      return <ServiceWise />;
    default:
      return null;
  }
};

const MultiDimensional = () => {
  const [selectedTab, setSelectedTab] = useState("CenterWise");

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="multi-container">
      <div className="multi-header">
        <button
          onClick={() => handleTabSwitch("CenterWise")}
          className={selectedTab === "CenterWise" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faHome} /> CenterWise
        </button>
        <button
          onClick={() => handleTabSwitch("CustomerWise")}
          className={selectedTab === "CustomerWise" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faUser} /> CustomerWise
        </button>
        <button
          onClick={() => handleTabSwitch("SegmentWise")}
          className={selectedTab === "SegmentWise" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faChartBar} /> SegmentWise
        </button>
        <button
          onClick={() => handleTabSwitch("ServiceWise")}
          className={selectedTab === "ServiceWise" ? "active" : ""}
        >
          <FontAwesomeIcon icon={faCog} /> ServiceWise
        </button>
      </div>
      <div className="separator"></div>
      <div className="multi-content">
        <TabContent tab={selectedTab} />
      </div>
    </div>
  );
};

export default MultiDimensional;
