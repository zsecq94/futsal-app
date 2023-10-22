import MatchScreen from "@/screens/AppScreens/matchscreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const MatchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="Match"
        component={MatchScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default MatchNavigation;
