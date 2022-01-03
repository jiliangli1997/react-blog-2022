import "./register.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      const res = await axios.post(
        "https://blog-api-337007.wl.r.appspot.com/api/auth/register",
        { username, email, password }
      );
      res.data && window.location.replace("/login");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn">Register</button>
      </form>
      <button className="loginBtn">
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </button>
      {err && <span style={{ marginTop: "10px" }}>Info needed</span>}
    </div>
  );
}
