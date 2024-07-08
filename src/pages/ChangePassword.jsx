import React from "react";
import bg3 from "../imgs/bg3.jpg";

function ChangePassword() {
  return (
    <div
      className="bg-cover w-full min-h-screen bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg3})`,
      }}
    >
      <div className="max-w-2xl mx-auto py-[7em] text-center">
        <h1 className="text-4xl font-bold text-purple-700">Page in Progress</h1>
        <p className="text-lg mt-4 text-gray-700">
          We are working hard to bring this page to you soon.
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;
