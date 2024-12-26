import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svgs/Quality-Academy.svg";
import Notification from "../../components/Notification/Notification";
import line from "../../assets/svgs/Line.svg";
import line1 from "../../assets/svgs/Line1.svg";
import signupIllustration from "../../assets/svgs/Signup.svg";
import "./Signup.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // profession: "",
  });
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
    if (formData.password !== formData.confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }
    if(formData.password.length < 6) {
      showNotification("Password must be at least 6 characters long", "error");
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        showNotification("Registration successful!", "success");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        showNotification(`Registration failed: ${result.message}`, "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      showNotification("An error occurred during registration", "error");
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
      <div className="container">

        <div className="main row">
          <div className="form-wrapper col-lg-5">
            <img className="logo mb-20" src={logo} alt="Quality Academy Logo" />
            <h1 className="heading-text d-flex mb-2">
              Register Now!
              <img className="line_illustration mt-3" src={line} alt="Line" />
            </h1>
            <p className="sub-text">
              Already have an account? <a href="/login">Login</a>
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="label-form" htmlFor="name">
                Name
              </label>
              <input
                className="input-space"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
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
              <label className="label-form" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="input-space"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {/* <label className="label-form" htmlFor="profession">
                Profession
              </label>
              <select
                className="input-space"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your profession
                </option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select> */}
              <button className="login-submit" type="submit">
                Register
              </button>
            </form>
          </div>
          <div className="illustration col-lg-7">
            <img className="line-1" src={line1} alt="Line 1" />
            <img
              className="main-illustration"
              src={signupIllustration}
              alt="Signup Illustration"
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default Register;