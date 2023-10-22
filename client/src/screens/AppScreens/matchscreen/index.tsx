import theme, { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import MatchMatchingScreen from "../match-matching-screen";
import MatchMercenaryScreen from "../match-mercenary-screen";
import MatchReservationScreen from "../match-reservation-screen";
import Calendar from "@/components/shared/calender";
import moment from "moment";
import HrTag from "@/components/shared/hrtag";

const formattedDate = moment().format("YYYY-MM-DD");

const MatchScreen = () => {
  const [check, setCheck] = useState(0);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  return (
    <Box>
      <Box flexDirection="row">
        <Text
          onPress={() => setCheck(0)}
          variant="textLg"
          fontWeight="700"
          p="3"
          style={{
            textAlign: "center",
            width: "33%",
            color: check === 0 ? theme.colors.green700 : "black",
            borderBottomWidth: check === 0 ? 2 : 0,
            borderBottomColor: check === 0 ? theme.colors.green700 : "black",
          }}
        >
          매칭
        </Text>
        <Text
          onPress={() => setCheck(1)}
          variant="textLg"
          fontWeight="700"
          p="3"
          style={{
            textAlign: "center",
            width: "34%",
            color: check === 1 ? theme.colors.green700 : "black",
            borderBottomWidth: check === 1 ? 2 : 0,
            borderBottomColor: check === 1 ? theme.colors.green700 : "black",
          }}
        >
          예약
        </Text>
        <Text
          onPress={() => setCheck(2)}
          variant="textLg"
          fontWeight="700"
          p="3"
          style={{
            textAlign: "center",
            width: "33%",
            color: check === 2 ? theme.colors.green700 : "black",
            borderBottomWidth: check === 2 ? 2 : 0,
            borderBottomColor: check === 2 ? theme.colors.green700 : "black",
          }}
        >
          용병
        </Text>
      </Box>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      <HrTag />
      {check === 0 && <MatchMatchingScreen selectedDate={selectedDate} />}
      {check === 1 && <MatchReservationScreen selectedDate={selectedDate} />}
      {check === 2 && <MatchMercenaryScreen selectedDate={selectedDate} />}
    </Box>
  );
};

export default MatchScreen;
