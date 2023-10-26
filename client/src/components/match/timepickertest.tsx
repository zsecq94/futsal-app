import { getTodayDate } from "@/services/api";
import theme, { Box } from "@/utils/theme";
import React, { useEffect, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// type TimePickerProps = {
//   selectedTimes: number[];
//   selectedDate: string;
//   Date: {
//     todayDate: string;
//     todayTime: {
//       todayHour: string;
//       todayMinute: string;
//     };
//   };
//   setSelectedTimes: React.Dispatch<React.SetStateAction<number[]>>;
// };

const TimePickerTest = ({
  selectedTimes,
  selectedDate,
  date,
  newName,
  setSelectedTimes,
}: any) => {
  // 선택 날짜가 오늘이면 현재시간부터 24시까지 아니면 6시부터 24시까지 times배열생성
  let currHour = 6;
  if (date.todayDate === selectedDate) {
    let minute = Number(date.todayTime.todayMinute) < 30 ? 0.5 : 1;
    currHour = Number(date.todayTime.todayHour) + minute;

    if (currHour < 6) {
      currHour = 6;
    }
  }

  const times = Array.from({ length: (23.5 - currHour) * 2 + 1 }, (_, i) => [
    i * 0.5 + currHour,
    i * 0.5 + currHour + 0.5,
  ]);

  // 시간을 포맷하는 함수
  const formatTime = (time: any) => {
    let hours = Math.floor(time);
    let minutes = time % 1 > 0 ? "30" : "00";
    return `${hours}:${minutes}`;
  };

  const [dateList, setDateList] = useState([]);
  useEffect(() => {
    const getTodayTime = async () => {
      try {
        const res = await getTodayDate({ newName, state: false });
        setDateList(res);
      } catch (error) {
        console.log("error in getTodayTime");
        throw error;
      }
    };
    getTodayTime();
  }, [selectedDate]);
  console.log(times);
  return (
    <Box style={{ padding: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((time, index) => {
          return (
            <Box key={index}>
              <TouchableOpacity>
                <Box
                  height={50}
                  width={60}
                  style={{
                    backgroundColor: "grey",
                    borderLeftWidth: 1,
                    borderColor: "white",
                    borderTopLeftRadius: index === 0 ? 10 : 0,
                    borderBottomLeftRadius: index === 0 ? 10 : 0,
                    borderTopRightRadius: index === times.length - 1 ? 10 : 0,
                    borderBottomRightRadius:
                      index === times.length - 1 ? 10 : 0,
                  }}
                />
              </TouchableOpacity>
              <Box
                style={{
                  marginLeft: -15,
                }}
              >
                {index === times.length - 1 && (
                  <Box justifyContent="space-between" flexDirection="row">
                    <Text>{formatTime(time[0])}</Text>
                    <Text>{time[1]}</Text>
                  </Box>
                )}
                {index !== 0 && index !== times.length - 1 && (
                  <Text>{formatTime(time[0])}</Text>
                )}
                {index === 0 && (
                  <Text style={{ marginLeft: 15 }}>{formatTime(time[0])}</Text>
                )}
              </Box>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default TimePickerTest;
