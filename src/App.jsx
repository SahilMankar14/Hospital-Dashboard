import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/LogIn";
import { routes } from "./routes";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const updateAppState = (dataFromLogin) => {
    setAuthenticated(dataFromLogin);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="grid-container">
      {isAuthenticated ? (
        <>
          <div className="app-header">
            <Header onLogout={handleLogout} onToggleSidebar={toggleSidebar} />
          </div>
          <div className="app-sidebar">
            <Sidebar isOpen={isSidebarOpen} onCloseSidebar={toggleSidebar} />
          </div>
          <div className="main">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route
                path="/"
                element={<Navigate to="/quickinsights" replace />}
              />
            </Routes>
          </div>
        </>
      ) : (
        <>
          {/* Only show the Login component if not authenticated */}
          <div className="app-log-in">
            <Routes>
              <Route
                path="/"
                element={<Login onLoginUpdate={updateAppState} />}
              />
              {/* Redirect to login if the user tries to access other routes */}
              <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
