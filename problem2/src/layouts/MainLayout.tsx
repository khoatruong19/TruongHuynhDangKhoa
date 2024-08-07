import { Header } from "@/components/layout";
import { PropsWithChildren } from "react";

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="h-screen max-w-6xl w-full mx-auto flex flex-col">
      <Header />
      <div className="flex-1 self-stretch  flex flex-col items-center">
        {children}
      </div>
    </main>
  );
};
