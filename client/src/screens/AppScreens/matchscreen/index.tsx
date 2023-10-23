import Calendar from "@/components/match/calender";
import HrTag from "@/components/shared/hrtag";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import moment from "moment";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import MatchMatchingScreen from "../match-matching-screen";
import MatchMercenaryScreen from "../match-mercenary-screen";
import MatchReservationScreen from "../match-reservation-screen";

const formattedDate = moment().format("YYYY-MM-DD");

const MatchScreen = () => {
  const { user } = useUserGlobalStore();
  // const checkNum = user?.team ? 0 : 1;
  const [check, setCheck] = useState(0);
  const [selectedDate, setSelectedDate] = useState(formattedDate);

  const data = [""];
  return (
    <Box>
      <Box flexDirection="row">
        <TouchableOpacity
          onPress={() => setCheck(0)}
          style={{
            width: "33%",
            borderBottomWidth: check === 0 ? 2 : 0,
            borderBottomColor: check === 0 ? theme.colors.green700 : "black",
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{
              textAlign: "center",
              color: check === 0 ? theme.colors.green700 : "black",
            }}
          >
            매칭
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCheck(1)}
          style={{
            width: "33%",
            borderBottomWidth: check === 1 ? 2 : 0,
            borderBottomColor: check === 1 ? theme.colors.green700 : "black",
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{
              textAlign: "center",
              color: check === 1 ? theme.colors.green700 : "black",
            }}
          >
            예약
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCheck(2)}
          style={{
            width: "33%",
            borderBottomWidth: check === 2 ? 2 : 0,
            borderBottomColor: check === 2 ? theme.colors.green700 : "black",
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{
              textAlign: "center",
              color: check === 2 ? theme.colors.green700 : "black",
            }}
          >
            용병
          </Text>
        </TouchableOpacity>
      </Box>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      <HrTag />
      {check === 0 && (
        <MatchMatchingScreen selectedDate={selectedDate} data={data} />
      )}
      {check === 1 && <MatchReservationScreen selectedDate={selectedDate} />}
      {check === 2 && <MatchMercenaryScreen selectedDate={selectedDate} />}
    </Box>
  );
};

export default MatchScreen;
