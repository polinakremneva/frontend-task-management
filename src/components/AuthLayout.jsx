import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AuthLayout() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mt-[5em] flex-grow">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
