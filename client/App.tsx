import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { Socketcontext, socket } from "@/context/SocketContext";
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
          <Socketcontext.Provider value={socket}>
            <Navigation />
            <StatusBar style="auto" />
          </Socketcontext.Provider>
        </SafeAreaWrapper>
      </SafeAreaProvider>
      <Toast />
    </ThemeProvider>
  );
};

export default App;
