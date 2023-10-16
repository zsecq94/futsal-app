import Button from "@/components/button";
import Navigation from "@/navigation";
import theme, { Box, Text } from "@/utils/theme";
import { ThemeProvider } from "@shopify/restyle";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
