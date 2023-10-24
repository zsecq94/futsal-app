import theme, { Box } from "@/utils/theme";
import React, { useState } from "react";

import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
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

const TimePicker = ({
  selectedTimes,
  selectedDate,
  Date,
  dateList,
  setSelectedTimes,
}: any) => {
  // 선택 날짜가 오늘이면 현재시간부터 24시까지 아니면 6시부터 24시까지 times배열생성
  let currHour = 6;
  if (Date.todayDate === selectedDate) {
    let minute = Number(Date.todayTime.todayMinute) < 30 ? 0.5 : 1;
    currHour = Number(Date.todayTime.todayHour) + minute;

    if (currHour < 6) {
      currHour = 6;
    }
  }
  const times = Array.from(
    { length: (24 - currHour) * 2 + 1 },
    (_, i) => i * 0.5 + currHour
  );

  // 시간을 포맷하는 함수
  const formatTime = (time: any) => {
    let hours = Math.floor(time);
    let minutes = time % 1 > 0 ? "30" : "00";
    return `${hours}:${minutes}`;
  };

  return (
    <Box>
      <Text
        style={{
          paddingBottom: 10,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {selectedTimes.length === 0
          ? "시간선택"
          : selectedTimes.length === 1
          ? `${formatTime(selectedTimes[0])} ~ 00:00`
          : `${formatTime(selectedTimes[0])} ~ ${formatTime(selectedTimes[1])}`}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {times.map((time, index) => {
          const isSelected = selectedTimes.includes(time);
          const isInRange =
            selectedTimes.length === 2 &&
            time >= Math.min(...selectedTimes) &&
            time <= Math.max(...selectedTimes);
          const isReserved = dateList?.includes(time);

          return (
            <TouchableOpacity
              key={time}
              onPress={() => {
                if (selectedTimes.length < 2) {
                  if (
                    time - selectedTimes[0] > 3 ||
                    selectedTimes[0] - time > 3
                  ) {
                    alert("최대 신청 시간은 3시간 입니다.");
                    setSelectedTimes([]);
                    return;
                  }
                  if (selectedTimes.length === 1 && time < selectedTimes[0]) {
                    setSelectedTimes([time, ...selectedTimes]);
                  } else {
                    setSelectedTimes([...selectedTimes, time]);
                  }
                } else {
                  setSelectedTimes([time]);
                }
              }}
              disabled={isReserved}
            >
              <View
                style={[
                  styles.timeBar,

                  // isSelected or isInRange 일 때 배경색 변경
                  (isSelected || isInRange) && styles.selectedBar,

                  index === 0 && styles.roundedLeftCorner,
                  index === times.length - 1 && styles.roundedRightCorner,
                  isReserved && styles.disabledBar,
                ]}
              >
                <Text
                  style={[
                    styles.timeText,

                    // isSelected or isInRange 일 때 텍스트 색상 변경
                    (isSelected || isInRange) && styles.selectedTime,
                    isReserved && styles.disabledTime,
                  ]}
                >
                  {Math.floor(time)}:{time % 1 ? "30" : "00"}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  timeBar: {
    width: "100%",
    height: 50,
    marginHorizontal: 10,

    backgroundColor: theme.colors.gray300,
    justifyContent: "center",
  },
  roundedLeftCorner: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  roundedRightCorner: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  timeText: {
    fontSize: 16,
    textAlign: "center",
  },

  selectedBar: {
    backgroundColor: theme.colors.green700,
  },

  selectedTime: {
    color: "white",
    fontWeight: "bold",
  },
  disabledBar: {
    backgroundColor: theme.colors.gray500, // 투명도가 적용된 색상
  },
  disabledTime: {
    color: "white", // 투명도가 적용된 텍스트 색상
    fontWeight: "bold",
  },
});

export default TimePicker;
