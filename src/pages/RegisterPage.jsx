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
import TooltipIcon from "@/components/ToolTip";
import { useAuth } from "@/contexts/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import api from "@/services/api.service";
import bg3 from "../imgs/bg3.jpg";

function RegisterPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(true); // Example state, adjust as per your logic
  const [emailAvailable, setEmailAvailable] = useState(true); // Example state, adjust as per your logic

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const isValid = passwordRegex.test(newPassword);

    setPasswordValid(isValid);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    // Example logic to check username availability
    setUsernameAvailable(true); // Replace with your availability check
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Example logic to check email availability
    setEmailAvailable(true); // Replace with your availability check
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        username,
        password,
        email,
        firstName,
        lastName,
      });

      if (response.data.error) {
        toast({
          title: response.data.error,
          description: "Please, try again!",
          className: "bg-red-100 text-black ",
        });
      } else {
        toast({
          title: "You have been registered successfully!",
          description: "Welcome :)",
          className: "bg-purple-100 text-black",
        });
        navigate("/auth/login");
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        className: "bg-red-100",
      });
    }
  };

  return (
    <div
      className="bg-cover w-full h-screen bg-center px-5"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%), url(${bg3})`,
      }}
    >
      <Card className="shadow-2xl mt-[1.5em] w-full md:max-w-xl lg:mx-auto">
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
