import useUserGlobalStore from "@/store/useUserGlobalStore";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "./appnavigation";
import AuthNavigation from "./authnavigation";

const Navigation = () => {
  const { user } = useUserGlobalStore();

  return (
    <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
