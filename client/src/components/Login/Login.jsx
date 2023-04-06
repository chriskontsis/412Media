import React from "react";
import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello Worlds</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis corporis magnam maxime laborum nesciunt earum,
            recusandae dolores consequuntur eos. Laboriosam consectetur, placeat
            officia excepturi nulla enim optio iste cupiditate eius!
          </p>
          <span>Don't you have an account?</span>
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </form>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
