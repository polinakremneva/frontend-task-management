import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "../contexts/theme-provider";
import { useState } from "react";
import classNames from "classnames";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setTheme(newTheme);
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-purple-200 dark:hover:bg-transparent"
      onClick={toggleTheme}
    >
      <Sun
        className={classNames("h-[1.2rem] w-[1.2rem] transition-all", {
          "rotate-0 scale-100": !isDarkTheme,
          "dark:-rotate-90 dark:scale-0": isDarkTheme,
        })}
      />
      <Moon
        className={classNames("absolute h-[1.2rem] w-[1.2rem] transition-all", {
          "rotate-90 scale-0": !isDarkTheme,
          "dark:rotate-0 dark:scale-100 ": isDarkTheme,
        })}
      />
    </Button>
  );
}
