import { useEffect, useState } from "react";

type ThemeValues = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeValues>("light");

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // set document attribute when theme changes
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    document.documentElement.setAttribute("data-theme", "dark");
  }, [theme]);

  // get theme when the component first mounted
  useEffect(() => {
    if (typeof window === undefined) return;

    const savedTheme = localStorage.getItem("theme") as ThemeValues;
    if (!savedTheme) return;

    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    setTheme(savedTheme);
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme: handleToggleTheme,
  };
};
