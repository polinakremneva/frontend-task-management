import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { GiNotebook } from "react-icons/gi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import { useAuth } from "../contexts/AuthProvider";
import user1 from "../imgs/user1.jpg";

const MySwal = withReactContent(Swal);

function Navbar() {
  const { loggedInUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false); // State for settings menu

  const handleAvatarClick = () => {
    if (!loggedInUser) {
      MySwal.fire({
        title: "Please log in",
        text: "You need to log in to access your account.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setMenuOpen(false); // Ensure the menu doesn't open if not logged in
    }
  };

  return (
    <header className="bg-white/5 md:px-10 py-2 flex justify-between shadow-sm items-center h-16">
      <div className="flex px-2 lg:px-[3em] items-center gap-8">
        <Link
          className="text-primary flex tracking-wider gap-2 font-bold text-2xl items-center"
          to="/"
        >
          taskify
          <GiNotebook className="text-[2em] text-violet-900" />
        </Link>
      </div>
      {/* Mobile Menu Button */}
      <div className="block sm:hidden">
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link className="w-full" to="/history">
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" to="contact">
                Contact
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="w-full" to="task">
                Tasks
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden sm:flex flex-grow items-centerjustify-center">
        <ul className="flex items-center gap-5">
          <li>
            <AboutPage />
          </li>
          <li>
            <ContactPage />
          </li>
          <li className="text-[1.5em]  hover:text-white hover:bg-violet-700 font-semibold px-3 tracking-wider rounded transition-colors duration-300">
            <Link to="/task">my tasks</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center  lg:px-[3em] gap-4">
        {!loggedInUser && (
          <Link
            to="/auth/login"
            className="text-[1.2em] text-violet-700 border h-8 border-violet-700 font-semibold lg:px-3 tracking-wider rounded transition duration-300 ease-in-out transform hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-violet-700 hover:shadow-lg hover:scale-105"
          >
            login
          </Link>
        )}
        {loggedInUser && (
          <DropdownMenu
            open={settingsMenuOpen}
            onOpenChange={setSettingsMenuOpen}
          >
            <DropdownMenuTrigger onClick={handleAvatarClick}>
              <Avatar className="h-8 w-8">
                {loggedInUser ? (
                  <AvatarImage src={user1} />
                ) : (
                  <AvatarFallback className=" bg-purple-200">
                    {loggedInUser.username
                      ? loggedInUser.username.toUpperCase().charAt(0)
                      : null}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {loggedInUser.username}'s Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
