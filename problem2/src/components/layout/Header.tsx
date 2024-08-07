import LogoImg from "@/assets/logo.svg";
import { Typography } from "@/components/common";
import { ThemeSwitch } from "@/components";

export const Header = () => {
  return (
    <header>
      <nav className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="app-logo"
            src={LogoImg}
            className="h-12 md:h-16 w-auto object-cover"
          />
          <Typography level="h3" className="sm:block hidden">
            Token Converter
          </Typography>
        </div>
        <ThemeSwitch />
      </nav>
    </header>
  );
};
