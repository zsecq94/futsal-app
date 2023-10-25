import { TouchableOpacity } from "react-native";
import React from "react";
import { Box, Text } from "@/utils/theme";

const MatchCard = ({ data, onPress }: any) => {
  console.log(data);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: "center",
      }}
    >
      <Box
        mt="2"
        py="2"
        px="5"
        justifyContent="space-between"
        style={{
          width: "90%",
          height: 100,
          backgroundColor: "white",
          borderRadius: 10,
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
        <Text>Hi</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default MatchCard;
