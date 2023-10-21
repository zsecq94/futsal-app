import theme, { Box, Text } from "@/utils/theme";
import React from "react";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <Box
      mt="5"
      borderRadius="rounded-2xl"
      p="3"
      width={"50%"}
      alignItems="center"
      style={{
        backgroundColor: theme.colors.blue400,
      }}
    >
      <Text>{label}</Text>
    </Box>
  );
};

export default Button;
