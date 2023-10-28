import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Navigation from "@/navigation";
import theme from "@/utils/theme";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaWrapper>
          <Navigation />
          <StatusBar style="auto" />
        </SafeAreaWrapper>
      </SafeAreaProvider>
      <Toast />
    </ThemeProvider>
  );
};

export default App;
