import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout =()=>{
    localStorage.removeItem('token');
  }
  return (
    <div>
      <nav className="flex items-center justify-between m-3">
        <div className="logo text-[25px] font-bold" >MGVM</div>
        {token?(<><button
          onClick={handleLogout}
          className="button-83 text-xl"
          role="button"
        >
          LogOut
        </button></>):(<button
          onClick={() => navigate("/login")}
          className="button-83 text-xl"
          role="button"
        >
          LogIn
        </button>)}
       
      </nav>
    </div>
  );
};

export default Header;
