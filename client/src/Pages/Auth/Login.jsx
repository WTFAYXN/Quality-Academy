import React from "react";
import logo from "../../assets/svgs/Quality-Academy.svg";
import line from "../../assets/svgs/Line.svg";
import line1 from "../../assets/svgs/Line1.svg";
import loginIllustration from "../../assets/svgs/Login.svg";
import "./Login.css";

const Login = () => {
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
          New to Quality Academy? <a href="#">Sign Up</a>
        </p>
        <form className="login-form" action="">
          <label className="label-form" htmlFor="email">
            Email Address
          </label>
          <input
            className="input-space"
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
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
            placeholder="Password"
            required
          />
          <div className="agreement d-flex justify-content-between align-items-center">
            <div className="check-agreement">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Keep me logged in</label>
            </div>
            <a className="forgot-pass" href="#">
              <p>Forgot Password?</p>
            </a>
          </div>
          <button className="login-submit" type="submit">
            Log In
          </button>
        </form>
      </div>
      <div className="illustration">
        <img className="line-1" src={line1} alt="Line 1" />
        <img className="main-illustration" src={loginIllustration} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Login;