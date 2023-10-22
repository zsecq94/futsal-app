import React, { useEffect } from "react";
import theme, { Box, Text } from "@/utils/theme";

const Content = ({ data }: any) => {
  return (
    <Box alignItems="center">
      <Box
        borderRadius="rounded-4xl"
        width={"85%"}
        height={50}
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: theme.colors.white,
        }}
      >
        <Text>{data.place}</Text>
        <Box
          flexDirection="row"
          style={{
            gap: 30,
          }}
        >
          <Text>{data.team[0]}</Text>
          <Text>{data.time}</Text>
          <Text>{data.team[1]}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;
