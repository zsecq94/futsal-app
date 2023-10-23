import Button from "@/components/shared/button";
import Card from "@/components/match/card";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";

const MatchMatchingScreen = ({ selectedDate, data }: any) => {
  const navigate = useNavigation();
  const onPress = () => {
    navigate.navigate("SignIn", { date: selectedDate });
  };
  return (
    <Box>
      <Pressable
        onPress={() => {
          console.log("버튼 누름");
        }}
      >
        <Button label="매칭 신청하기" onPress={onPress} />
      </Pressable>
      <Box>
        {data.length > 0 ? (
          data.map((V: any, index: number) => <Card key={index} V={V} />)
        ) : (
          <Text>매칭이 없습니다...</Text>
        )}
      </Box>
    </Box>
  );
};

export default MatchMatchingScreen;
