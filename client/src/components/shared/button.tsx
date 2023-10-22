import theme, { Box, Text } from "@/utils/theme";
import React from "react";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <Box
      borderRadius="rounded-2xl"
      p="2"
      alignItems="center"
      style={{
        backgroundColor: theme.colors.white,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text variant="text2Xl" fontWeight="700">
        {label}
      </Text>
    </Box>
  );
};

export default Button;
