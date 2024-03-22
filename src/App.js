import "bootstrap/dist/css/bootstrap.min.css";

import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "./App.css";
import PageError from "./pages/PageError";
// Lazy-loaded components
const Home = React.lazy(() => import("./pages/Home"));
const Result = React.lazy(() => import("./pages/Result"));
const ResultForm = React.lazy(() => import("./pages/ResultForm"));
const Login = React.lazy(() => import("./pages/Login"));
const StudentResult = React.lazy(() => import("./pages/StudentResult"));

const LoadingSpinner = () => (
  <div className="spinner-container items-center justify-center flex mt-[200px]">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
);
const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/result" element={<Result />} />
            <Route path="/admin/result/add" element={<ResultForm token={token}/>} />
            <Route path="/admin/result" element={<StudentResult token={token}/>} />
            <Route path="*" element={<PageError />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
};

export default App;
