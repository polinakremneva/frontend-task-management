import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-100 px-4">
        <section className=" py-12">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-6 lg:space-y-0 lg:space-x-16">
            <div className="max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Organize your tasks
                <br />
                with ease.
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Effortlessly manage your tasks and projects with our intuitive
                task management application.
              </p>
              <Link to="/auth/register">
                <button className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-purple-800 transition duration-300">
                  Get Started
                  <IoArrowForwardCircleOutline className="inline-block ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
