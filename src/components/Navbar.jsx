import React from "react";
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
// import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthProvider";
import AboutPage from "@/pages/AboutPage";
import { GiNotebook } from "react-icons/gi";
import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Navbar() {
  const { loggedInUser, logout } = useAuth();

  const handleAvatarClick = () => {
    if (!loggedInUser) {
      MySwal.fire({
        title: "Please log in",
        text: "You need to log in to access your account.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <header className="bg-white/5 px-10 flex justify-between shadow-sm items-center h-16">
      <div>
        <Link
          className="text-primary flex uppercase gap-2 font-bold text-2xl items-center"
          to="/"
        >
          taskify
          <GiNotebook className="text-[2em]" />
        </Link>
      </div>
      <nav>
        <ul className="flex gap-5">
          <li>
            <AboutPage />
          </li>
          <li className="text-[2em]">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="text-[2em]">
            <Link to="/task">Tasks</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        {!loggedInUser && (
          <Link to="/auth/login" className="text-[2em]">
            Login
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger onClick={handleAvatarClick}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={loggedInUser?.imgUrl} />
              <AvatarFallback>
                {loggedInUser?.username.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {loggedInUser ? (
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {loggedInUser?.username}'s Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link>Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          ) : null}
        </DropdownMenu>
        <ModeToggle />
      </div>
    </header>
  );
}

export default Navbar;
