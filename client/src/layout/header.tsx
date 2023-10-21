import theme, { Box, Text } from "@/utils/theme";
import React from "react";

const Header = () => {
  return (
    <Box
      flexDirection="row"
      height={60}
      p="4"
      justifyContent="space-between"
      alignItems="center"
      style={{
        backgroundColor: theme.colors.white,
      }}
    >
      <Text
        variant="textXl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        빛가람풋살장
      </Text>
      <Text variant="textBase">헤더입니다</Text>
    </Box>
  );
};

export default Header;
