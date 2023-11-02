import Button from "@/components/shared/button";
import { SocketContext, getSocket } from "@/context/SocketContext";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box } from "@/utils/theme";
import React, { useContext } from "react";

const RankingScreen = () => {
  const { user, updateUser, logoutUser } = useUserGlobalStore();

  const socket = getSocket();
  const logout = () => {
    socket.off(`${user?.id}-update`);
    socket.off(`${user?.id}-apply-update`);
    logoutUser();
  };

  return (
    <Box>
      <Button label="로그아웃" onPress={logout} />
    </Box>
  );
};

export default RankingScreen;
