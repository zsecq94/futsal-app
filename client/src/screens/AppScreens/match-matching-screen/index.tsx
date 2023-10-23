import TimePickerPreview from "@/components/match/timepicker-preview";
import HrTag from "@/components/shared/hrtag";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

const MatchMatchingScreen = () => {
  const navigate = useNavigation();
  const onPress = () => {
    navigate.navigate("SignIn");
  };
  return (
    <ScrollView
      style={{
        padding: 8,
      }}
    >
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        구장 현황
      </Text>
      <HrTag />
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
            <Text variant="textBase">A구장</Text>
            <Text variant="textBase">5경기</Text>
          </Box>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: "center",
        }}
      >
        <Box
          mt="5"
          py="2"
          px="5"
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
            <Text variant="textBase">B구장</Text>
            <Text variant="textBase">5경기</Text>
          </Box>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: "center",
        }}
      >
        <Box
          my="5"
          py="2"
          px="5"
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
            <Text variant="textBase">C구장</Text>
            <Text variant="textBase">5경기</Text>
          </Box>
        </Box>
      </TouchableOpacity>
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        매칭 대기중...
      </Text>
      <HrTag />
    </ScrollView>
  );
};

export default MatchMatchingScreen;
