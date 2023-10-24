import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity } from "react-native";
import TimePickerPreview from "./timepicker-preview";
import CardCategory from "./cardcategory";

const Card = ({ V, index, onPress }: any) => {
  const newId = index === 0 ? "A" : index === 1 ? "B" : "C";

  return (
    <TouchableOpacity
      onPress={() => onPress(newId)}
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
          <Text variant="textBase">{newId} 구장</Text>
          <Text variant="textBase">{V?.count} 경기</Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <CardCategory V={newId} />
        </Box>
        <Box height={5} />
        <TimePickerPreview date={V?.times} />
      </Box>
    </TouchableOpacity>
  );
};

export default Card;
