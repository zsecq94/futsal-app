import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthNavigation from "./authnavigation";
import Login from "@/screens/loginscreen";
import AppNavigation from "./appnavigation";
import useUserGlobalStore from "@/store/useUserGlobalStore";

const Navigation = () => {
  const { user } = useUserGlobalStore();
  console.log(user);
  return (
    <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
