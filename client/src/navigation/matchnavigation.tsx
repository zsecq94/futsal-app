import MatchScreen from "@/screens/AppScreens/Match/matchscreen";
import SignInScreen from "@/screens/AppScreens/Match/signinscreen";
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
