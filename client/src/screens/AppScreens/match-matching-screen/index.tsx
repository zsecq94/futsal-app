import Card from "@/components/match/card";
import MatchCard from "@/components/match/matchcard";
import HrTag from "@/components/shared/hrtag";
import { getFalseMatch } from "@/services/api";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const MatchMatchingScreen = () => {
  const navigate = useNavigation();
  const goSignIn = (name: any) => {
    navigate.navigate("SignIn", name);
  };

  const goMatchDetail = () => {
    console.log("눌림");
  };

  const [matchData, setMatchData] = useState([]);
  const data = [
    ["A", 0],
    ["B", 0],
    ["C", 0],
  ];

  useEffect(() => {
    const getMatch = async () => {
      try {
        const res = await getFalseMatch();
        setMatchData(res);
      } catch (error) {
        console.log("error in getMatch");
        throw error;
      }
    };
    getMatch();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
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
      {data.map((V, index) => (
        <Box key={index}>
          <Card V={V} onPress={() => goSignIn(V[0])} />
          <Box height={10} />
        </Box>
      ))}
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        매칭 대기중
      </Text>
      <HrTag />
      {matchData.map((V) => (
        <Box key={V._id}>
          <MatchCard data={V} onPress={goMatchDetail} />
          <Box height={10} />
        </Box>
      ))}
      <Box height={80} />
    </ScrollView>
  );
};

export default MatchMatchingScreen;
