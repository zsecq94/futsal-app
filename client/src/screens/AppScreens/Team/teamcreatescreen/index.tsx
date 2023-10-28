import HrTag from "@/components/shared/hrtag";
import NavigateBack from "@/components/shared/navigate-back";
import theme, { Box, Text } from "@/utils/theme";
import React from "react";

const TeamCreateScreen = () => {
  return (
    <Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mx="5"
        mt="3"
      >
        <Text
          variant="text2Xl"
          fontWeight="700"
          style={{
            color: theme.colors.green700,
          }}
        >
          팀 생성하기
        </Text>
        <NavigateBack />
      </Box>
      <HrTag />
    </Box>
  );
};

export default TeamCreateScreen;
