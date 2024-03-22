import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Header from "./components/Header";
import './App.css'
import ResultForm from "./pages/ResultForm";
import Login from "./pages/Login";
import StudentResult from "./pages/StudentResult";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/result/add" element={<ResultForm />} />
          <Route path="/admin/result" element={<StudentResult />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
