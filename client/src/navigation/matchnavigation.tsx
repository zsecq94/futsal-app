import MatchScreen from "@/screens/AppScreens/matchscreen";
import SignInScreen from "@/screens/AppScreens/signinscreen";
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
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MatchNavigation;
