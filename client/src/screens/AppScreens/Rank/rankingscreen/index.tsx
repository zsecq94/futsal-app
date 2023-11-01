import Button from "@/components/shared/button";
import { Socketcontext } from "@/context/SocketContext";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box, Text } from "@/utils/theme";
import React, { useContext } from "react";

const RankingScreen = () => {
  const { user, updateUser, logoutUser } = useUserGlobalStore();
  const socket = useContext(Socketcontext);
  const logout = () => {
    socket.off();
    logoutUser();
  };

  return (
    <Box>
      <Button label="로그아웃" onPress={logout} />
    </Box>
  );
};

export default RankingScreen;
