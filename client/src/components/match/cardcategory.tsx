import theme, { Text } from "@/utils/theme";
import React from "react";

const CardCategory = ({ V }: any) => {
  const check = V === "C" ? "5대5" : "6대6";
  return (
    <Text
      p="1"
      style={{
        fontSize: 10,
        backgroundColor: theme.colors.green700,
        color: "white",
        borderRadius: 5,
      }}
    >
      {check}
    </Text>
  );
};

export default CardCategory;
