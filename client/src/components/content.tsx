import React from "react";
import theme, { Box, Text } from "@/utils/theme";

const Content = ({ data }: any) => {
  console.log(data);
  return (
    <Box
      borderRadius="rounded-4xl"
      width={"85%"}
      height={50}
      style={{
        backgroundColor: theme.colors.gray200,
      }}
    >
      <Text></Text>
    </Box>
  );
};

export default Content;
