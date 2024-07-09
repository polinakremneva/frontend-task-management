import React from "react";
import { Link } from "react-router-dom";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import {
  FaTasks,
  FaCheckCircle,
  FaUsers,
  FaRocket,
  FaBell,
  FaSyncAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import backgroundImage from "../imgs/bg.jpg";
import user1 from "../imgs/user1.jpg";
import user2 from "../imgs/user2.jpg";
import bg2 from "../imgs/bg2.jpg";

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-100">
        <section
          className="py-12 bg-cover bg-center h-screen"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${backgroundImage})`,
          }}
        >
          <div className="max-w-5xl mx-[5.5em] flex flex-col lg:flex-row items-center mt-[5em] lg:items-start justify-between space-y-6 lg:space-y-0 lg:space-x-16">
            <div className="max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Organize your tasks
                <br />
                with ease.
              </h1>
              <p className="text-lg text-gray-700 mb-8 drop-shadow-lg">
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

        {/* Feature Section */}
        <section className="py-[6em] dark:bg-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <FaTasks className="text-purple-700 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Task Management</h3>
                <p className="text-gray-700 dark:text-slate-200">
                  Create, edit, and organize your tasks with ease.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-purple-700 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Complete Tasks</h3>
                <p className="text-gray-700 dark:text-slate-200">
                  Mark tasks as complete and keep track of your progress.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-purple-700 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-gray-700 dark:text-slate-200">
                  Share tasks with your team and collaborate efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="lg:my-12 bg-cover bg-center h-screen"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg2})`,
          }}
        >
          <div className="lg:max-w-5xl mx-auto text-center lg:py-24 ">
            <h2 className="text-3xl font-bold py-8 lg:py-16 lg:mb-0 text-white drop-shadow-xl">
              Discover More Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-3">
              <div className=" dark:bg-gray-900 group p-6 bg-white rounded-md shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <FaRocket className="text-purple-700 text-4xl mb-4 group-hover:rotate-45 transform transition duration-500" />
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-gray-700 mb-4 dark:text-gray-200">
                  Get insights and detailed reports about your tasks and
                  projects.
                </p>
                <Link to="/analytics">
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="dark:bg-gray-900 group p-6 bg-white rounded-md shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <FaBell className="text-purple-700 text-4xl mb-4 group-hover:rotate-45 transform transition duration-500" />
                <h3 className="text-xl font-bold mb-2">Custom Notifications</h3>
                <p className="text-gray-700 mb-4 dark:text-gray-200">
                  Set custom reminders and never miss an important deadline.
                </p>
                <Link to="/notifications">
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
              <div className="dark:bg-gray-900 group p-6 bg-white rounded-md shadow-md transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <FaSyncAlt className="text-purple-700 text-4xl mb-4 group-hover:rotate-180 transform transition duration-500" />
                <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                <p className="text-gray-700 mb-4 dark:text-gray-200">
                  Integrate with your favorite tools and services for a seamless
                  workflow.
                </p>
                <Link to="/integration">
                  <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-md shadow-md">
                <p className="text-gray-700 mb-4">
                  "This app has completely transformed the way I manage my
                  tasks. Highly recommended!"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={user1}
                    alt="Alex"
                    className="rounded-full mr-2 w-16"
                  />
                  <div>
                    <h4 className="text-lg font-bold">Alex</h4>
                    <p className="text-gray-600">CEO, Chain Reaction</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white rounded-md shadow-md">
                <p className="text-gray-700 mb-4">
                  "Efficient and easy to use. It has helped me stay organized
                  and meet deadlines."
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={user2}
                    alt="Joan"
                    className="rounded-full mr-2 w-16"
                  />
                  <div>
                    <h4 className="text-lg font-bold">Joan</h4>
                    <p className="text-gray-600">Manager, NVIDIA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
      </div>
    </>
  );
};

export default HomePage;
