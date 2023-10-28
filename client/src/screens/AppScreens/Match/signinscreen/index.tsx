import Calendar from "@/components/match/calender";
import Level from "@/components/match/level";
import TimePicker from "@/components/match/timepicker";
import Button from "@/components/shared/button";
import HrTag from "@/components/shared/hrtag";
import { matchSign } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

const SignInScreen = () => {
  const navigate = useNavigation();
  const todayDate = moment().format("YYYY-MM-DD");
  const todayHour = moment().format("HH");
  const todayMinute = moment().format("mm");
  const second = moment().format("ss");

  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [level, setLevel] = useState("");

  const route = useRoute();
  const { name }: any = route.params;

  const { user } = useUserGlobalStore();
  const userTeam = user?.team;

  const levelData = ["하", "중하", "중", "중상", "상"];

  const date = {
    todayDate: todayDate,
    todayTime: {
      todayHour: todayHour,
      todayMinute: todayMinute,
    },
  };

  const handleSubmit = async () => {
    try {
      if (validityCheck) {
        const res = await matchSign({
          userTeam,
          name,
          level,
          selectedDate,
          selectedTimes,
          todayTime: todayHour + todayMinute + second,
        });
        let type;
        if (res.message === "신청 완료") {
          type = "success";
        } else {
          type = "error";
        }
        Toast.show({
          type: type,
          text1: `👍 ${res.message}`,
        });
        navigate.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "선택사항을 모두 선택해주세요",
        });
      }
    } catch (error) {
      console.log("error in handleSubmit");
      throw error;
    }
  };

  const validityCheck =
    selectedDate && selectedTimes.length == 2 && user?.team !== null && level;

  const handleLevel = (level: any) => {
    setLevel(level);
  };

  return (
    <Box py="5">
      <Box
        p="3"
        mx="10"
        style={{
          alignItems: "center",
          backgroundColor: theme.colors.green700,
          borderRadius: 10,
        }}
      >
        <Text variant="textLg" fontWeight="700" style={{ color: "white" }}>
          {name}구장
        </Text>
      </Box>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      <HrTag />
      <TimePicker
        selectedTimes={selectedTimes}
        selectedDate={selectedDate}
        date={date}
        setSelectedTimes={setSelectedTimes}
        name={name}
      />
      <HrTag />
      <Text
        py="2"
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        실력 선택
      </Text>
      <Box px="10" py="3" flexDirection="row" justifyContent="space-between">
        {levelData.map((V, index) => (
          <Level level={level} key={index} V={V} onPress={handleLevel} />
        ))}
      </Box>
      <Box height={20} />
      <Button label="매칭 신청하기" onPress={handleSubmit} />
    </Box>
  );
};

export default SignInScreen;
