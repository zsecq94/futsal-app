import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity } from "react-native";

const Filter = ({ name, onPress, selectedFilter }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(name)}>
      <Box
        p="2"
        style={{
          borderRadius: 10,
          backgroundColor:
            selectedFilter === name
              ? theme.colors.green700
              : theme.colors.gray200,
        }}
      >
        <Text
          variant="textSm"
          fontWeight="700"
          style={{
            color: selectedFilter === name ? "white" : "black",
          }}
        >
          {name}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Filter;
