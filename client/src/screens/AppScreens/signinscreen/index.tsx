import Calendar from "@/components/match/calender";
import TimePicker from "@/components/match/timepicker";
import { Box, Text } from "@/utils/theme";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import React, { useState } from "react";

const SignInScreen = () => {
  const formattedDate = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  return (
    <Box py="5">
      <Box>
        <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
        <TimePicker />
      </Box>
    </Box>
  );
};

export default SignInScreen;
