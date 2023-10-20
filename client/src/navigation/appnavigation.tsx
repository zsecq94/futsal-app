import HomeScreen from "@/screens/AppScreens/homescreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottomnavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
