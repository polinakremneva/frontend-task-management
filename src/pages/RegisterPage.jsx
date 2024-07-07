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

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);

  const { toast } = useToast();

  const { register } = useAuth();
  const navigate = useNavigate();

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

  return (
    <Card className="shadow-2xl w-full md:max-w-xl mx-auto">
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
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
              />
            </div>
            <div className="w-full md:w-1/2 self-end">
              <div className=" flex justify-between">
                <Label>Password:</Label>
                <TooltipIcon />
              </div>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password..."
                className={`${
                  passwordValid ? "border-green-500" : "border-red-500"
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter an email..."
              />
            </div>
            <div className="w-full md:w-1/2 flex items-end">
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800"
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
  );
}

export default RegisterPage;
