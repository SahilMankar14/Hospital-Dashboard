import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/LogIn";
import { routes } from "./routes";
import { supabase } from "./supabaseClient"; // Make sure to import supabase

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Save the current route to localStorage whenever it changes
      localStorage.setItem("lastVisitedPage", location.pathname);
    }
  }, [location.pathname, isAuthenticated]); // Track route changes only when authenticated

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setAuthenticated(true);
      const lastVisitedPage = localStorage.getItem("lastVisitedPage");
      if (lastVisitedPage) {
        navigate(lastVisitedPage);
      }
    } else {
      setAuthenticated(false);
      localStorage.removeItem("lastVisitedPage");
    }
  };

  const updateAppState = (dataFromLogin) => {
    setAuthenticated(dataFromLogin);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="grid-container">
      {isAuthenticated ? (
        <>
          <div className="app-header">
            <Header onToggleSidebar={toggleSidebar} />
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
