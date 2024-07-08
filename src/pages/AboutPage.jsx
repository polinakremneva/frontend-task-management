import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { CgMoreO } from "react-icons/cg";
import { CalendarCheck2 } from "lucide-react";

function AboutPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <span className="cursor-pointer text-[2em] flex items-center">
            About
            <ChevronDown
              className={`ml-1 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 py-7 bg-white border-none shadow-xl w-[30em]">
          <div className="text-gray-800">
            <div className="flex items-center mb-6">
              <CalendarCheck2 className="text-purple-700 text-4xl mr-4 animate-bounce" />
              <h2 className="text-3xl font-bold text-purple-700">
                Welcome to Taskify
              </h2>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              <span className="font-bold text-purple-700">Taskify</span>{" "}
              redefines task management with elegance and efficiency. Our
              platform empowers individuals and teams to streamline workflows,
              track progress, and achieve goals effortlessly.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Discover the power of seamless collaboration and intuitive
              productivity tools. From personal task lists to complex project
              management, Taskify adapts to your needs, ensuring every task is
              handled with precision and clarity.
            </p>
            <div className="flex items-center">
              <Link
                to="/history"
                className="text-lg font-semibold text-purple-700 hover:bg-purple-100 py-2 px-4 rounded-md flex items-center transition duration-300"
              >
                See More
                <CgMoreO className="pl-2 text-2xl" />
              </Link>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AboutPage;
