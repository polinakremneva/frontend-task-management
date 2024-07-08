import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import TooltipIcon from "@/components/ToolTip";
import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api.service";
import bg3 from "../imgs/bg3.jpg";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState(true); // Track username availability
  const [emailAvailable, setEmailAvailable] = useState(true); // Track email availability

  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/check-username/${username}`, // Corrected URL format
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response from server");
      }

      const data = await response.json();
      setUsernameAvailable(data.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setUsernameAvailable(false); // Default to false on error or unavailable
    }
  };

  const checkEmailAvailability = async (email) => {
    try {
      if (!email.includes("@")) {
        setEmailAvailable(false);
        return;
      }
      const response = await fetch(
        `http://localhost:3000/api/auth/check-email/${email}`, // Corrected URL format
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response from server");
      }

      const data = await response.json();
      setEmailAvailable(data.available);
    } catch (error) {
      console.error("Error checking username availability:", error);
      setEmailAvailable(false); // Default to false on error or unavailable
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const userData = {
      username,
      password,
      firstName,
      lastName,
      email,
    };

    try {
      await register(userData);
      toast({
        title: "You have been registered successful!",
        description: "Welcome:)",
        className: " bg-purple-100",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const isValid = passwordRegex.test(newPassword);

    setPasswordValid(isValid);
  };

  const handleUsernameChange = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    if (newUsername.trim() !== "") {
      await checkUsernameAvailability(newUsername);
    }
  };

  const handleEmailChange = async (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail.trim() !== "") {
      await checkEmailAvailability(newEmail);
    }
  };

  return (
    <div
      className="bg-cover w-full h-screen bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg3})`,
      }}
    >
      <Card className="shadow-2xl mt-[5em] w-full md:max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Register</span> <LogIn />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Label>Username:</Label>
                <Input
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Enter username..."
                />
                {!usernameAvailable && (
                  <p className="text-red-500 text-md">Username not available</p>
                )}
              </div>
              <div className="w-full md:w-1/2 self-end">
                <div className="flex justify-between">
                  <Label>Password:</Label>
                  <TooltipIcon />
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter password..."
                  className={`border ${
                    password &&
                    (passwordValid ? "border-green-500" : "border-red-500")
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Label>First name:</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name..."
                />
              </div>
              <div className="w-full md:w-1/2">
                <Label>Last name:</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name..."
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <Label>Email:</Label>
                <Input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter an email..."
                />
                {!emailAvailable && (
                  <p className="text-red-500 text-md">Email not available</p>
                )}
              </div>
              <div className="w-full md:w-1/2 flex items-end">
                <Button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800"
                  disabled={!usernameAvailable || !emailAvailable}
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-xs">
            Already have an account?{" "}
            <Link
              className="underline font-bold text-purple-700"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegisterPage;
