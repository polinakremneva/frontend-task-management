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

const MySwal = withReactContent(Swal);

function Navbar() {
  const { loggedInUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="bg-white/5 mx-[3em] sm:px-10 py-2 flex justify-between shadow-sm items-center h-16">
      <div className="flex items-center">
        <Link
          className="text-primary flex uppercase gap-2 font-bold text-2xl items-center"
          to="/"
        >
          taskify
          <GiNotebook className="text-[2em] text-violet-900" />
        </Link>
      </div>
      <nav className="hidden sm:flex flex-grow justify-center">
        <ul className="flex gap-5">
          <li>
            <AboutPage />
          </li>
          <li>
            <ContactPage />
          </li>
          <li className="text-[2em]">
            <Link to="/task">Tasks</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        {!loggedInUser && (
          <Link
            to="/auth/login"
            className="text-[1.2em] text-violet-700 border h-8 border-violet-700 hover:text-white hover:bg-violet-700 font-semibold px-3 tracking-wider rounded transition-colors duration-300"
          >
            Login
          </Link>
        )}
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger onClick={handleAvatarClick}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={loggedInUser?.imgUrl} />
              <AvatarFallback className=" bg-purple-200">
                {loggedInUser?.username
                  ? loggedInUser.username.toUpperCase()
                  : "?"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {loggedInUser && (
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {loggedInUser.username}'s Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile-settings">Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
