import { Switch } from "@/components/common";
import { useTheme } from "@/providers/ThemeProvider";

export const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const isDarkTheme = theme === "dark";

  return (
    <div className="flex items-center gap-3">
      {isDarkTheme ? "🌙" : "☀️"}
      <Switch checked={isDarkTheme} onClick={toggleTheme} />
    </div>
  );
};
