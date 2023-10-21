import useUserGlobalStore from "@/store/useUserGlobalStore";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigation from "./appnavigation";
import AuthNavigation from "./authnavigation";
import Header from "@/layout/header";

const Navigation = () => {
  const { user } = useUserGlobalStore();
  console.log(user);
  return (
    <NavigationContainer>
      {user?.id ? (
        <>
          <Header />
          <AppNavigation />
        </>
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
