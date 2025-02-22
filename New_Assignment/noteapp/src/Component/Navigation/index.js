import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

export const Navigation = () => {
  const [isLogoutIcon, setIsLogoutIcon] = useState(false);
  const navigate = useNavigate();
  
  const logoutUser = (e) => {
    e.preventDefault();
    localStorage.clear("userInfo");
    navigate("/");
  };

  return (
    <div>
      <div className="bg-[#5C218B] relative text-white flex items-center justify-between px-10 py-4">
        <div className="text-2xl"><img src={"Frame.png"} alt="logo" className="h-7 mx-auto" /></div>
        <div> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 cursor-pointer"
            onClick={() => {
              setIsLogoutIcon(!isLogoutIcon);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="float-right mt-5 pr-5">
        {isLogoutIcon && (
          <Button classes="text-red-500 border-2 px-7 border-red-500 py-1.5 rounded-md" onClick={logoutUser}>
            Log out
          </Button>
        )}
      </div>
    </div>
  );
};
