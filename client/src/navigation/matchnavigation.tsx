import MatchDetailScreen from "@/screens/AppScreens/Match/match-detail-screen";
import MatchScreen from "@/screens/AppScreens/Match/match-screen";
import SignInScreen from "@/screens/AppScreens/Match/signin-screen";
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
      <Stack.Screen
        name="MatchDetail"
        component={MatchDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MatchNavigation;
