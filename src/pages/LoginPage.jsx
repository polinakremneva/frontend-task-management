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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const { toast } = useToast();

  const navigate = useNavigate();
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const userData = { username, password };
    try {
      await login(userData);
      navigate("/task");
      toast({
        title: "Welcome back!",
        description: "Nice to see you :)",
        className: " bg-purple-100",
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <Card className="shadow-2xl w-[20em]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Login</span> <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label>Username:</Label>
            <Input
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label>Password:</Label>
            <Input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className=" bg-purple-700 hover:bg-purple-800">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className=" flex flex-col items-start">
        <p className="text-xs">
          Dont have an account?{" "}
          <Link
            className="underline font-bold text-purple-800"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
        <p>
          <Link className="underline text-purple-700 text-xs ">
            Forgotten your password?
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginPage;
