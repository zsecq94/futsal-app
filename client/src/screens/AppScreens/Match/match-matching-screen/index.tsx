import Calendar from "@/components/match/calender";
import Card from "@/components/match/card";
import MatchCard from "@/components/match/matchcard";
import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import { SocketContext } from "@/context/SocketContext";
import { fetcher } from "@/services/config";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import useSWR from "swr";

const MatchMatchingScreen = () => {
  const navigate = useNavigation<any>();
  const todayDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const socket = useContext(SocketContext);

  const {
    data: matchData,
    isLoading: matchDataIsLoading,
    mutate: matchDataMutate,
  } = useSWR(`matchs/get-false-match/${selectedDate}`, fetcher);

  const {
    data: todayData,
    isLoading: isLoadingTodayData,
    mutate: todayDataMutate,
  } = useSWR(`matchs/get-today-date/${selectedDate}`, fetcher);

  useEffect(() => {
    const getMatch = async () => {
      await matchDataMutate();
      await todayDataMutate();
    };
    getMatch();
  }, [selectedDate]);

  useEffect(() => {
    if (socket) {
      socket.on("create-match", async () => {
        await matchDataMutate();
        await todayDataMutate();
      });
    }

    return () => {
      if (socket) {
        socket.off("create-match");
      }
    };
  }, [socket, matchData, todayData]);

  const goSignIn = ({ name }: any) => {
    navigate.navigate("SignIn", { name, selected: selectedDate });
  };

  const goMatchDetail = (data: any) => {
    navigate.navigate("MatchDetail", { data });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 8,
      }}
    >
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      {matchDataIsLoading || !matchData || isLoadingTodayData || !todayData ? (
        <Loader />
      ) : (
        <>
          <Text
            ml="5"
            variant="text2Xl"
            fontWeight="700"
            style={{
              color: theme.colors.green700,
            }}
          >
            {selectedDate.slice(5, 7)}월 {selectedDate.slice(8, 10)}일 구장 현황
          </Text>
          <HrTag />
          {todayData?.map((data: any, index: number) => (
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
            {selectedDate.slice(5, 7)}월 {selectedDate.slice(8, 10)}일 매칭
            대기중
          </Text>
          <HrTag />
          {matchData?.map((V: any, index: number) => (
            <Box key={index}>
              <MatchCard data={V} onPress={() => goMatchDetail(V)} />
              <Box height={10} />
            </Box>
          ))}
          <Box height={80} />
        </>
      )}
    </ScrollView>
  );
};

export default MatchMatchingScreen;
