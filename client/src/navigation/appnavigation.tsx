import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottomnavigation";
import { AppStackParamList } from "./types";

const Stack = createNativeStackNavigator<AppStackParamList>();

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
