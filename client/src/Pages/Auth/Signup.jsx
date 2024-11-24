import React from "react";
import logo from "../../assets/svgs/Quality-Academy.svg";
import line from "../../assets/svgs/Line.svg";
import line1 from "../../assets/svgs/Line1.svg";
import signupIllustration from "../../assets/svgs/Signup.svg";
import "./Signup.css";

const Register = () => {
  return (
    <div className="main">
      <div className="form-wrapper">
        <img className="logo mb-20" src={logo} alt="Quality Academy Logo" />
        <h1 className="heading-text d-flex mb-2">
          Register Now!
          <img className="line_illustration" src={line} alt="Line" />
        </h1>
        <p className="sub-text">
          Already have an account? <a href="#">Login</a>
        </p>
        <form className="login-form" action="">
          <label className="label-form" htmlFor="name">
            Name
          </label>
          <input
            className="input-space"
            type="text"
            id="name"
            name="name"
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
            required
          />
          <label className="label-form" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="input-space"
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
          />
          <label className="label-form" htmlFor="profession">
            Profession
          </label>
          <select
            className="input-space"
            id="profession"
            name="profession"
            required
          >
            <option value="" disabled selected>
              Select your profession
            </option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="other">Other</option>
          </select>
          <button className="login-submit" type="submit">
            Log In
          </button>
        </form>
      </div>
      <div className="illustration">
        <img className="line-1" src={line1} alt="Line 1" />
        <img
          className="main-illustration"
          src={signupIllustration}
          alt="Signup Illustration"
        />
      </div>
    </div>
  );
};

export default Register;