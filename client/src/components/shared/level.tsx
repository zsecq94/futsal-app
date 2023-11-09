import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity } from "react-native";

const Level = ({ level, V, onPress }: any) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onPress(V)}
      style={{
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 16,
        alignItems: "center",
        backgroundColor: level === V ? theme.colors.green700 : "#eee",
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        elevation: 5,
      }}
    >
      <Text
        variant="textBase"
        fontWeight="700"
        style={{
          color: level === V ? "white" : "black",
        }}
      >
        {V}
      </Text>
    </TouchableOpacity>
  );
};

export default Level;
