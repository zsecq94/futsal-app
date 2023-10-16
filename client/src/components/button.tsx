import React, { useState, useEffect } from "react";
import theme, { Box, Text } from "@/utils/theme";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  const backgroundColor =
    label === "카카오"
      ? theme.colors.yellow300
      : label === "구글"
      ? theme.colors.amber100
      : theme.colors.green600;

  return (
    <Box
      mt="5"
      borderRadius="rounded-2xl"
      p="3"
      alignItems="center"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Text>{label}</Text>
    </Box>
  );
};

export default Button;
