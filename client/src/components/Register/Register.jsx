import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Hello Worlds</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis corporis magnam maxime laborum nesciunt earum,
            recusandae dolores consequuntur eos. Laboriosam consectetur, placeat
            officia excepturi nulla enim optio iste cupiditate eius!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Gender" />
            <input type="text" placeholder="Hometown" />
            <input type="text" placeholder="Gender" />
            <input type="text" placeholder="Date of Birth" />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
