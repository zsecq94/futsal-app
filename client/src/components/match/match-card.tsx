import { TouchableOpacity } from "react-native";
import React from "react";
import { Box, Text } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";

const MatchCard = ({ data, onPress }: any) => {
  // console.log(data);

  const convertTime = (decimalTime: any) => {
    const hours = Math.floor(decimalTime);
    const minutes = (decimalTime - hours) * 60;
    return `${hours}:${minutes === 0 ? "00" : minutes}`;
  };
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
        flexDirection="row"
        style={{
          gap: 30,
          justifyContent: "center",
          alignItems: "center",
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
        <Box>
          <Box flexDirection="row" style={{ gap: 5, alignItems: "center" }}>
            <Ionicons name="football-outline" size={20} color="black" />
            <Text variant="textXl" fontWeight="700">
              {data.place}구장
            </Text>
          </Box>
          <Box flexDirection="row" style={{ gap: 5, alignItems: "center" }}>
            <Ionicons name="person-outline" size={20} color="black" />
            <Text variant="textXl" fontWeight="700">
              {data.team1}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box flexDirection="row" style={{ gap: 5, alignItems: "center" }}>
            <Ionicons name="time-outline" size={20} color="black" />
            <Text variant="textXl" fontWeight="700">
              {convertTime(data.time[0][0])} ~ {convertTime(data.time[1][1])}
            </Text>
          </Box>
          <Box flexDirection="row" style={{ gap: 5, alignItems: "center" }}>
            <Ionicons name="speedometer-outline" size={20} color="black" />
            <Text variant="textXl" fontWeight="700">
              {data.level}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MatchCard;
