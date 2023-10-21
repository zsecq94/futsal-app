import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottomnavigation";
import { Text } from "@/utils/theme";

const Stack = createNativeStackNavigator();

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
