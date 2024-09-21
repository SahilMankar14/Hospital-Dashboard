import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./LogIn.css";
import BrandImage from "../assets/fin.png";

const LogIn = ({ onLoginUpdate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const [isAuthenticated, setAuthenticated] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setMessage("Login failed. Please check your credentials.");
      } else {
        setMessage("Login Successful.");
        onLoginUpdate(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/quickinsights");
        // setAuthenticated(true);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setMessage("An unexpected error occurred.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="login-container">
      <div className="block1">
        <div className="container-1">
          <img src={BrandImage} alt="FinKeep Logo" className="brand-image" />
          <h1>Welcome To FinKeep</h1>
          <p>Start Doing Your Accounting AI-MAZINGLY</p>
        </div>
      </div>
      <div className="auth-container">
        <form onSubmit={handleLogin} className="auth-box">
          <h2 className="auth-heading">Let's FinKeep</h2>
          <div>
            <label className="auth-label">
              Username:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="auth-input"
              />
            </label>
          </div>
          <div>
            <label className="auth-label">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="auth-input"
              />
            </label>
          </div>
          <div>
            <button className="auth-button2" onKeyDown={handleKeyDown}>
              Login
            </button>
          </div>
          <div>
            <p className="auth-alert">{message}</p>
          </div>
          <div className="text-center">
            <h4 className="font-medium">Or</h4>
          </div>
          <div className="text-center underline mt-2">
            <a
              href="https://forms.office.com/r/WPrbpAAqMW"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#007bff] hover:text-[#0056b3]"
            >
              Request For Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
