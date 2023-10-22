import Button from "@/components/shared/button";
import { Box } from "@/utils/theme";
import React from "react";
import { Pressable } from "react-native";

const MatchMatchingScreen = ({ selectedDate }: any) => {
  return (
    <Box>
      <Pressable
        onPress={() => {
          console.log("버튼 누름");
        }}
      >
        <Button label="매칭 신청하기" />
      </Pressable>
    </Box>
  );
};

export default MatchMatchingScreen;
