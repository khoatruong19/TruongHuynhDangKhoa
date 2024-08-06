import LogoImg from "@/assets/logo.svg";
import { Typography } from "../common";

export const Header = () => {
  return (
    <header>
      <nav className="p-4">
        <div className="flex items-center gap-3">
          <img
            alt="app-logo"
            src={LogoImg}
            className="h-16 w-auto object-cover"
          />
          <Typography level="h2" className="md:block hidden">
            Token Converter
          </Typography>
        </div>
      </nav>
    </header>
  );
};
