// import React from "react";
import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  // State for form data
  const [formData, setFormData] = useState({});

  // Handle input changes and update the form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("handling change");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the server
      await axios.post("http://localhost:3005/register", formData);

      // Show success message
      alert("Registration successful");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>CSE412 Media</h1>
          <p>Welcome to CSE412 Media Please Register Your Account.</p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="text"
              name="hometown"
              placeholder="Hometown"
              onChange={handleChange}
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
            />
            <input
              type="text"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={handleChange}
            />
            {/* Change button type to submit */}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
