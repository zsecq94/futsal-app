import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AuthNavigation from "./authnavigation";
import Login from "@/screens/Login";

const Navigation = () => {
  const user = false;
  return (
    <NavigationContainer>
      {user ? <AuthNavigation /> : <Login />}
    </NavigationContainer>
  );
};

export default Navigation;
