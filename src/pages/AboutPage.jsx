import React, { useState } from "react";
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
          <div className=" text-gray-800 ">
            <div className="flex items-center mb-4">
              <CalendarCheck2 />
              <h2 className="text-2xl pl-2 font-bold">Welcome to Taskify</h2>
            </div>
            <p className="text-lg leading-relaxed mb-6">
              At Taskify, we redefine task management with elegance and
              efficiency. Our platform empowers individuals and teams to
              streamline workflows, track progress, and achieve goals
              effortlessly.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Discover the power of seamless collaboration and intuitive
              productivity tools. From personal task lists to complex project
              management, Taskify adapts to your needs, ensuring every task is
              handled with precision and clarity.
            </p>
            <div className="flex items-center">
              <a
                href="/about"
                className="text-lg font-semibold  hover:rounded-md hover:bg-slate-200 flex items-center"
              >
                See More
                <CgMoreO className=" pl-2 text-3xl" />
              </a>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AboutPage;
