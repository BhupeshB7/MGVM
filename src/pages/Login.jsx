// src/components/LoginForm.js

import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://mgvmserver.onrender.com/api/auth/login", { userName, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      setShowAlert(true); // Show alert upon successful login
      navigate('/admin/result')
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />
      <Container className="resultFormContainer">
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Login successful!
          </Alert>
        )}
        <div className="form_input mt-5">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ padding: "10px" }}
            className="border border-green-600"
          />
        </div>
        <div className="form_input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px" }}
            className="border border-green-600"
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="button-83 text-xl m-2" onClick={handleLogin}>
          {loading ? "Loading..." : "Login"}
        </button>
      </Container>
    </>
  );
};

export default Login;
