import Card from "@/components/match/card";
import MatchCard from "@/components/match/matchcard";
import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import { fetcher } from "@/services/config";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { ScrollView } from "react-native";
import useSWR from "swr";

const MatchMatchingScreen = () => {
  const navigate = useNavigation();
  const todayDate = moment().format("YYYY-MM-DD");

  const goSignIn = ({ name }: any) => {
    navigate.navigate("SignIn", { name });
  };

  const goMatchDetail = () => {
    console.log("눌림");
  };

  const { data: matchData, isLoading } = useSWR(
    "matchs/get-false-match",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const id = todayDate;
  const { data: todayData, isLoading: isLoadingTodayData } = useSWR(
    `matchs/get-today-date/${id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  if (isLoading || !matchData || isLoadingTodayData || !todayData) {
    return <Loader />;
  }

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
      {todayData?.map((data, index) => (
        <Box key={index}>
          <Card data={data} idx={index} onPress={goSignIn} />
          <Box height={10} />
        </Box>
      ))}
      <Box height={10} />
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
      {matchData?.map((V, index) => (
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
