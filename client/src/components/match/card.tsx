import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import TimePickerPreview from "./timepicker-preview";
import CardCategory from "./cardcategory";

const Card = ({ V, onPress }: any) => {
  const date = [
    7, 7.5, 8, 8.5, 8.9, 9, 9.5, 10, 10.5, 10.9, 15, 15.5, 16, 16.5, 17, 17.5,
    17.9, 20, 20.5, 21, 21.5, 22,
  ];
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
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="textBase">{V[0]}구장</Text>
          <Text variant="textBase">{V[1]}경기</Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <CardCategory V={V[0]} />
        </Box>
        <Box height={5} />
        <TimePickerPreview date={date} />
      </Box>
    </TouchableOpacity>
  );
};

export default Card;
