import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svgs/Quality-Academy.svg";
import line from "../../assets/svgs/Line.svg";
import line1 from "../../assets/svgs/Line1.svg";
import loginIllustration from "../../assets/svgs/Login.svg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Login successful");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login");
    }
  };

  return (
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
  );
};

export default Login;