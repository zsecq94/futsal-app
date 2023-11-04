import TeamCreateScreen from "@/screens/AppScreens/Team/teamcreatescreen";
import TeamDetailScreen from "@/screens/AppScreens/Team/teamdetailscreen";
import TeamInfoScreen from "@/screens/AppScreens/Team/teaminfoscreen";
import TeamScreen from "@/screens/AppScreens/Team/teamscrees";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const TeamNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Team"}
        component={TeamScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamCreate"
        component={TeamCreateScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamDetail"
        component={TeamDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TeamInfo"
        component={TeamInfoScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default TeamNavigation;
