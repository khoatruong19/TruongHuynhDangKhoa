import { MainLayout } from "./layouts";
import { TokenConvertForm } from "@/components";
import { ThemeProvider } from "./providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout>
          <TokenConvertForm />
        </MainLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
