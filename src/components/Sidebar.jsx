import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeFilled,
  GlobalOutlined,
  BarChartOutlined,
  BookOutlined,
  FileTextOutlined,
  BellOutlined,
  MoneyCollectOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./Sidebar.css";
import BrandImage from "../assets/Finkeep.png";
import { routes } from "../routes";

function Sidebar({ isOpen, onCloseSidebar }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const index = routes.findIndex((route) => route.path === currentPath);
    setSelectedItem(index);
  }, [location]);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <aside id="sidebar" className={isOpen ? "open" : ""}>
      <div className="sidebar-brand">
        <img src={BrandImage} alt="FinKeep Logo" />
        {/* Close button visible only on mobile */}
        <div className="close-icon" onClick={onCloseSidebar}>
          <CloseOutlined />
        </div>
      </div>
      <ul className="sidebar-list">
        {routes.map((item, index) => (
          <li
            key={index}
            className={`sidebar-list-item ${
              selectedItem === index ? "active" : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <Link to={item.path}>
              <span className="icon">
                {index === 0 && <HomeFilled />}
                {index === 1 && <GlobalOutlined />}
                {index === 2 && <BarChartOutlined />}
                {index === 3 && <BookOutlined />}
                {index === 4 && <FileTextOutlined />}
                {index === 5 && <BellOutlined />}
                {index === 6 && <MoneyCollectOutlined />}
              </span>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
