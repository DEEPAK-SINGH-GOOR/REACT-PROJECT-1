import React, { useState } from "react";
import { API } from "../config/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import '../CSS/Signup.css';

const Login = () => {
  const nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createUser = async (data) => {
    try {
      const res = await API.post("/users/login", data);
      const { user, token } = res.data;
      console.log(user, token);
      Cookies.set("token", token, { expires: 7 });
      nav("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(user);
  };

  return (
    <div>
      <form className="Login-form" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInput}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInput}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
