import Card from "@/components/match/card";
import MatchCard from "@/components/match/matchcard";
import HrTag from "@/components/shared/hrtag";
import { getFalseMatch, getTodayDate } from "@/services/api";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const MatchMatchingScreen = () => {
  const navigate = useNavigation();
  const [matchData, setMatchData] = useState([]);
  const [todayData, setTodayData] = useState([
    {
      times: [],
    },
    {
      times: [],
    },
    {
      times: [],
    },
  ]);
  const todayDate = moment().format("YYYY-MM-DD");
  const [refresh, setRefresh] = useState(false);

  const goSignIn = ({ name }: any) => {
    navigate.navigate("SignIn", { name });
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
    const getDate = async () => {
      try {
        const res = await getTodayDate({ id: todayDate });
        if (res.length > 0) {
          setTodayData(res);
        }
      } catch (error) {
        console.log("error in getDate");
        throw error;
      }
    };
    getDate();
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
      {todayData.map((data, index) => (
        <Box key={index}>
          <Card data={data} idx={index} refresh={refresh} onPress={goSignIn} />
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
