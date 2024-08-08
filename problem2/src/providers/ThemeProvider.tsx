import { PropsWithChildren, useEffect, useState } from "react";
import createContext from "@/libs/context";

type Theme = "light" | "dark";

interface ThemeProviderValues {
  theme: Theme;
  toggleTheme: () => void;
}

const [Provider, useTheme] = createContext<ThemeProviderValues>({
  name: "ThemeContext",
});

export { useTheme };

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("light");

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

    const savedTheme = localStorage.getItem("theme") as Theme;
    if (!savedTheme) return;

    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }

    setTheme(savedTheme);
  }, []);

  return (
    <Provider
      value={{
        theme,
        toggleTheme: handleToggleTheme,
      }}
    >
      {children}
    </Provider>
  );
};
