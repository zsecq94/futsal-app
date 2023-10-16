import React, { useState, useEffect } from "react";
import theme, { Box, Text } from "@/utils/theme";

type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return (
    <Box
      mt="5"
      borderRadius="rounded-2xl"
      p="3"
      m="20"
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
