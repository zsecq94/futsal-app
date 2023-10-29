import TeamCreateScreen from "@/screens/AppScreens/Team/teamcreatescreen";
import TeamDetailScreen from "@/screens/AppScreens/Team/teamdetailscreen";
import TeamInfoScreen from "@/screens/AppScreens/Team/teaminfoscreen";
import TeamSearchScreen from "@/screens/AppScreens/Team/teamsearchscreen";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const TeamNavigation = () => {
  const { user } = useUserGlobalStore();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={user?.team === null ? "TeamSearch" : "TeamInfo"}
        component={user?.team === null ? TeamSearchScreen : TeamInfoScreen}
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
    </Stack.Navigator>
  );
};

export default TeamNavigation;
