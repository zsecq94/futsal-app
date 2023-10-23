import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

const TimePicker = () => {
  const [selectedTimes, setSelectedTimes] = useState([]);

  // 새벽 6시부터 밤 12시까지의 모든 시간 (30분 단위)
  const times = Array.from({ length: (24 - 6) * 2 + 1 }, (_, i) => i * 0.5 + 6);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {times.map((time, index) => {
        const isSelected = selectedTimes.includes(time);
        const isInRange =
          selectedTimes.length === 2 &&
          time >= Math.min(...selectedTimes) &&
          time <= Math.max(...selectedTimes);

        return (
          <TouchableOpacity
            key={time}
            onPress={() => {
              if (selectedTimes.length < 2) {
                setSelectedTimes([...selectedTimes, time]);
              } else {
                setSelectedTimes([time]);
              }
            }}
          >
            <View
              style={[
                styles.timeBar,
                isInRange && styles.selectedBar,
                index === 0 && styles.roundedLeftCorner, // 첫 번째 아이템(6시)
                index === times.length - 1 && styles.roundedRightCorner, // 마지막 아이템(24시)
              ]}
            >
              <Text
                style={[styles.timeText, isSelected && styles.selectedTime]}
              >
                {Math.floor(time)}:{time % 1 ? "30" : "00"}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
  },
  timeBar: {
    width: "100%",
    height: 50,
    marginHorizontal: 10,

    backgroundColor: "lightgray",
    justifyContent: "center", // 텍스트를 중앙으로 배치

    //그림자 효과 추가
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // borderRadius: 10, // 기본적으로 모서리 둥글게 설정
  },
  roundedLeftCorner: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  roundedRightCorner: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  // text style inside the bar
  timeText: {
    fontSize: 16,
    textAlign: "center",
  },

  selectedBar: {
    backgroundColor: "red",
  },

  selectedTime: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default TimePicker;
