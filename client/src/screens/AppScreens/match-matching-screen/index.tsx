import Card from "@/components/match/card";
import MatchCard from "@/components/match/matchcard";
import HrTag from "@/components/shared/hrtag";
import { getFalseMatch, getTodayDate } from "@/services/api";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const MatchMatchingScreen = () => {
  const navigate = useNavigation();
  const [matchData, setMatchData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const data = ["A", "B", "C"];

  const goSignIn = (name: any) => {
    navigate.navigate("SignIn", name);
  };

  const goMatchDetail = () => {
    console.log("눌림");
  };

  useEffect(() => {
    const unsubscribe = navigate.addListener("focus", () => {
      setRefresh((prev) => !prev);
    });

    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    const getMatch = async () => {
      try {
        const res = await getFalseMatch();
        setMatchData(res.response);
      } catch (error) {
        console.log("error in getMatch");
        throw error;
      }
    };

    getMatch();
  }, [refresh]);

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
        오늘의 구장 현황
      </Text>
      <HrTag />
      {data.map((V, index) => (
        <Box key={index}>
          <Card V={V} onPress={goSignIn} />
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
      {matchData.map((V, index) => (
        <Box key={index}>
          <MatchCard data={V} onPress={goMatchDetail} />
          <Box height={10} />
        </Box>
      ))}
      <Box height={80} />
    </ScrollView>
  );
};

export default MatchMatchingScreen;
