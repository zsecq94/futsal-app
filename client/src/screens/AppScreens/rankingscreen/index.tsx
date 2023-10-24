import Button from "@/components/shared/button";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box, Text } from "@/utils/theme";
import React from "react";

const RankingScreen = () => {
  const { user, updateUser } = useUserGlobalStore();
  const logout = () => {
    updateUser(null);
  };
  return (
    <Box>
      <Button label="로그아웃" onPress={logout} />
    </Box>
  );
};

export default RankingScreen;
