import theme, { Box } from "@/utils/theme";
import React from "react";

const HrTag = () => {
  return (
    <Box
      my="2"
      mx="5"
      style={{ borderBottomColor: theme.colors.green700, borderBottomWidth: 2 }}
    />
  );
};

export default HrTag;