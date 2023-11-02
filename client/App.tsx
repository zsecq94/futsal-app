import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { SocketContext, getSocket } from "@/context/SocketContext";
import Navigation from "@/navigation";
import theme from "@/utils/theme";
import { ThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const App = () => {
  const socketInstance = getSocket();

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaWrapper>
          <SocketContext.Provider value={socketInstance}>
            <Navigation />
            <StatusBar style="auto" />
          </SocketContext.Provider>
        </SafeAreaWrapper>
      </SafeAreaProvider>
      <Toast />
    </ThemeProvider>
  );
};

export default App;
