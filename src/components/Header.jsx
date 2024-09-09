import React, { useState } from "react";
import axios from "axios";
import { Menu, Dropdown, Modal } from "antd";
import avatar from "../assets/avatar.png";
import {
  UserOutlined,
  SettingFilled,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { supabase } from "../supabaseClient";
import "./Header.css";

const Header = ({ onLogout, onToggleSidebar }) => {
  const [reportName, setReportName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenReport = async () => {
    setLoading(true);
    setError(null);

    const getCompanyId = async (email) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/company/${email}`
        );
        if (response.data.length > 0) {
          return response.data[0].company_id;
        }
      } catch (err) {
        console.error("There was an error fetching the company id!", err);
      }
    };

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session && session.user) {
      const userEmail = session.user.email;
      const companyId = await getCompanyId(userEmail);
      if (companyId) {
        const generatedReportName = `${companyId}-${userEmail}`; // Ensure companyId is not undefined
        setReportName(generatedReportName);

        try {
          const response = await axios.post(
            "http://localhost:3000/get-report-by-name",
            {
              reportName,
            }
          );

          const { webUrl } = response.data;
          window.open(webUrl, "_blank"); // Open the report in a new tab
        } catch (err) {
          setError("Failed to fetch the report. Please try again.");
        }
      } else {
        setError("Could not retrieve company ID. Please try again.");
      }
    } else {
      setError("User session is not valid. Please log in again.");
    }

    setLoading(false);
  };

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      // Handle logout logic here
    } else if (e.key === "settings") {
      showSettingsModal();
    }
    setMenuOpen(false);
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingFilled />}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <button onClick={onLogout}>Logout</button>
      </Menu.Item>
    </Menu>
  );

  const showSettingsModal = () => {
    setSettingsModalVisible(true);
  };

  const handleSettingsModalCancel = () => {
    setSettingsModalVisible(false);
  };

  return (
    <header className="header">
      <div className="menu-icon" onClick={onToggleSidebar}>
        <MenuOutlined />
      </div>
      <div className="header-left">
        <button
          onClick={handleOpenReport}
          disabled={loading}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg  transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Opening..." : "Open Power BI Report"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="header-right">
        <Dropdown
          overlay={userMenu}
          trigger={["click"]}
          open={menuOpen}
          onOpenChange={(open) => setMenuOpen(open)}
        >
          <div className="user-dropdown">
            <img src={avatar} className="h-12 w-12 rounded-full" alt="avatar" />
          </div>
        </Dropdown>
      </div>
      {/* User Settings Modal */}
      <Modal
        title="User Settings"
        open={isSettingsModalVisible}
        onCancel={handleSettingsModalCancel}
        footer={null}
      >
        {/* Add your settings form or content here */}
        <p>Settings content goes here.</p>
      </Modal>
    </header>
  );
};

export default Header;
