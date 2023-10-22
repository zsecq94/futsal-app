import { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import { Button, TextInput } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import TimePicker from "./timepicker";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "ko";

type DataPickerProps = {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  setCheckDataPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatePicker = ({
  selected,
  setSelected,
  setCheckDataPicker,
}: DataPickerProps) => {
  return (
    <Box position="absolute" zIndex={99} width={"100%"}>
      <Calendar
        minDate={new Date().toISOString().split("T")[0]}
        onDayPress={(day) => {
          setSelected(day.dateString);
          setCheckDataPicker(false);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: false,
            selectedColor: "orange",
          },
        }}
        renderHeader={(date) => {
          const newHeader = date.toISOString().split("T")[0];
          const year = newHeader.slice(0, 4);
          const month = newHeader.slice(5, 7);
          return (
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
            >{`${year}년 ${month}월`}</Text>
          );
        }}
      />
      <TimePicker />
    </Box>
  );
};

export default DatePicker;
