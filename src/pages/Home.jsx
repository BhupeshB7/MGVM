import React from "react";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Background />
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
