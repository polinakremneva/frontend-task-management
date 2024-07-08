import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { CgMoreO } from "react-icons/cg";
import { FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";

function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <span className="cursor-pointer text-[1.5em]  hover:text-white hover:bg-violet-700 font-semibold px-3 tracking-wider rounded transition-colors duration-300 flex items-center">
            contacts
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
              <h2 className="text-3xl font-bold text-purple-700">Contact Us</h2>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <FaMapMarker className="text-purple-700 text-xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Headquarters</h3>
                  <p>123 Taskify St, Tasktown, USA</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaPhone className="text-purple-700 text-xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Phone</h3>
                  <p>+1 234 567 890</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-purple-700 text-xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p>info@taskify.com</p>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ContactPage;
