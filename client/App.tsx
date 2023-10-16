import Button from "@/components/shared/button";
import Navigation from "@/navigation";
import theme, { Box, Text } from "@/utils/theme";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
