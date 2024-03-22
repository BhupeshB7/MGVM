import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (userName.length <= 3) {
      setError("Username must be greater than 3 characters");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://mgvmserver.onrender.com/api/auth/login", { userName, password });
      const { token } = response.data;
      localStorage.setItem("token", token);
      setError("");
      setShowAlert(true); // Show alert upon successful login
      navigate('/admin/result');
    } catch (error) {
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (value.length > 3) {
      setError("");
    }
    setUserName(value);
  };
  const handleShowPassword =()=>{
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Background />
      <Header/>
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
            onChange={handleUsernameChange}
            style={{ padding: "10px" }}
            className="border border-green-600"
          />
          {userName.length <= 3 && userName.length > 0 && (
            <div style={{ color: "red", marginTop: "5px" }}>
              Username must be greater than 3 characters
            </div>
          )}
        </div>
        <div className="form_input relative  overflow-hidden">
          <input
            type={showPassword?'text':'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px" }}
            className="border border-green-600 relative"
          />
           <img
            className="absolute top-2 right-3"
            src={showPassword ? "https://cdn-icons-png.flaticon.com/128/10812/10812267.png" : "https://cdn-icons-png.flaticon.com/128/535/535193.png"}
            onClick={handleShowPassword}
            height={30}
            width={30}
            alt="Show password"
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
