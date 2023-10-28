import { getOnePlaceData } from "@/services/api";
import theme, { Box } from "@/utils/theme";
import React, { useEffect, useState } from "react";

import { ScrollView, Text, TouchableOpacity } from "react-native";

const TimePicker = ({
  selectedTimes,
  selectedDate,
  date,
  setSelectedTimes,
  name,
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

  // 시간 포맷
  const formatTime = (time: any) => {
    let hours = Math.floor(time);
    let minutes = time % 1 > 0 ? "30" : "00";
    return `${hours}:${minutes}`;
  };

  const handlePress = (time: any) => {
    if (selectedTimes.length < 2) {
      if (selectedTimes.length === 1) {
        const duration = Math.abs(time[0] - selectedTimes[0][0]);

        if (duration > 2.5) {
          alert("최대 신청 시간은 3시간 입니다.");
          setSelectedTimes([]);
        } else {
          if (time[0] < selectedTimes[0][0]) {
            setSelectedTimes([time, ...selectedTimes]);
          } else {
            setSelectedTimes([...selectedTimes, time]);
          }
        }
      } else {
        setSelectedTimes([time]);
      }
    } else {
      setSelectedTimes([time]);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const getOnePlace = async () => {
      const res = await getOnePlaceData({ selectedDate, name });
      setData(res);
    };
    getOnePlace();
  }, [selectedDate]);

  return (
    <Box style={{ padding: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((time, index) => {
          let isSelected = false;
          if (selectedTimes.length === 2) {
            const start = Math.min(selectedTimes[0][0], selectedTimes[1][0]);
            const end = Math.max(selectedTimes[0][0], selectedTimes[1][0]);
            isSelected = time[0] >= start && time[0] <= end;
          } else {
            isSelected = selectedTimes.some(
              (selectedTime: number[]) => selectedTime[0] === time[0]
            );
          }

          return (
            <Box key={index}>
              <TouchableOpacity
                onPress={() => handlePress(time)}
                disabled={data?.some((d) => d[0] === time[0])}
              >
                <Box
                  height={30}
                  width={60}
                  style={{
                    backgroundColor: data?.some(
                      (d: any) => d[0] === time[0] && d[1] === time[1]
                    )
                      ? "grey"
                      : isSelected
                      ? theme.colors.green700
                      : theme.colors.gray200,
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
              <Box height={10} />
              <Box
                style={{
                  marginLeft: -17,
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
                  <Text style={{ marginLeft: 17 }}>{formatTime(time[0])}</Text>
                )}
              </Box>
            </Box>
          );
        })}
      </ScrollView>
    </Box>
  );
};

export default TimePicker;
