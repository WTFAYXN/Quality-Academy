import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svgs/Quality-Academy.svg";
import line from "../../assets/svgs/Line.svg";
import line1 from "../../assets/svgs/Line1.svg";
import loginIllustration from "../../assets/svgs/Login.svg";
import Notification from "../../components/Notification/Notification";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const from = location.state?.from || "/";

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  const closeNotification = () => {
    setNotification({ ...notification, visible: false });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        showNotification("Login successful!", "success");
        localStorage.setItem("token", result.token);
        localStorage.setItem("isAdmin", result.isAdmin);
        navigate(from, { replace: true });
      } else {
        showNotification(`Login failed: ${result.message}`, "error");;
      }
    } catch (error) {
      console.error("Error during login:", error);
      showNotification("An error occurred during login", "error");
    }
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={closeNotification}
      />
    <div className="main">
      <div className="form-wrapper">
        <img className="logo mb-20" src={logo} alt="Quality Academy Logo" />
        <h1 className="heading-text">
          Welcome! Please log in to access your account.
          <span>
            <img src={line} alt="Line" />
          </span>
        </h1>
        <p className="sub-text">
          New to Quality Academy? <a href="/signup">Sign Up</a>
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label-form" htmlFor="email">
            Email Address
          </label>
          <input
            className="input-space"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className="label-form" htmlFor="password">
            Password
          </label>
          <input
            className="input-space"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="forgotPassword">
          <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button className="login-submit" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="illustration">
        <img className="line-1" src={line1} alt="Line 1" />
        <img
          className="main-illustration"
          src={loginIllustration}
          alt="Login Illustration"
        />
      </div>
    </div>
    </>
  );
};

export default Login;