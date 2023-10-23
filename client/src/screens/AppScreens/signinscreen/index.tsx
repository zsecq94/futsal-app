import TimePicker from "@/components/match/timepicker";
import { Box, Text } from "@/utils/theme";
import { useRoute } from "@react-navigation/native";
import React from "react";

const SignInScreen = () => {
  const route = useRoute<any>();
  const { date } = route.params;

  return (
    <Box py="5">
      <Box>
        <Text textAlign="center" variant="text2Xl">
          선택 날짜 : {date}
        </Text>
        <TimePicker />
      </Box>
    </Box>
  );
};

export default SignInScreen;
