import React, { useContext } from "react";
import React, { useState } from 'react';
import "./login.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";




const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/login", {
        username,
        password,
      });
      if (response.data.success) {
        setMessage('Login successful');
        login();
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>CSE412 Media</h1>
          <p>Welcome to CSE412 Media</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;