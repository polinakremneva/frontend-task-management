import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
