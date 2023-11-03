import useUserGlobalStore from "@/store/useUserGlobalStore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import AppNavigation from "./appnavigation";
import AuthNavigation from "./authnavigation";
import { SocketContext } from "@/context/SocketContext";

const Navigation = () => {
  const { user, updateUser } = useUserGlobalStore();
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (socket) {
      socket.on(`${user?.id}-delete`, (newUser: IAuthUser) => {
        updateUser(newUser);
      });
    }

    return () => {
      if (socket) {
        socket.off(`${user?.id}-delete`);
      }
    };
  }, [socket]);
  return (
    <NavigationContainer>
      {user?.id ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
