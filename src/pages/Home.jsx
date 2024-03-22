import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../components/Header";
const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  return (
    <>
      <Background />
      <Header />
     {token && <Button variant="secondary" className="text-xl m-2 w-[100px]" onClick={()=>navigate('/admin/result')}>Admin</Button>} 
      <div className="flex items-center flex-col mt-[200px]">
        <p className="text-md text-center">Welcome to MGVM</p>
        <p className="text-3xl text-center">Annual Result 2K24</p>
        <button
          onClick={() => navigate("/result")}
          className="button-83 text-xl"
          role="button"
        >
          Check Result
        </button>
      </div>
    </>
  );
};

export default Home;
