import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import AuthNavigation from "./authnavigation";
import AppNavigation from "./appnavigation";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Navigation = () => {
  // 수정 필요
  // useEffect(() => {
  //   const getUserData = async () => {
  //     const storageData = JSON.parse(await AsyncStorage.getItem("user-store"));
  //     if (storageData) {
  //       console.log("데이터 있음");
  //     }
  //   };
  // }, []);

  const { user } = useUserGlobalStore();
  console.log(user);
  return (
    <NavigationContainer>
      {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
