import { MainLayout } from "./layouts";
import { TokenConvertForm } from "@/components";
import { ThemeProvider } from "./providers/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <TokenConvertForm />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
