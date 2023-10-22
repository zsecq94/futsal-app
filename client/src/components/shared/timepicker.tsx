import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";

const TimePicker = () => {
  const timeSlots = []; // 30분 단위의 시간 목록 생성

  for (let hour = 6; hour <= 23; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeSlots.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  const [selectedTimes, setSelectedTimes] = useState(["", ""]); // 선택한 두 시간 저장
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);

  useEffect(() => {
    // 현재 시간 정보 가져오기
    const now = new Date();
    setCurrentHour(now.getHours());
    setCurrentMinute(now.getMinutes());
  }, []);

  const handleTimeSelection = (time: any) => {
    const [selectedHour, selectedMinute] = time.split(":").map(Number);
    if (
      selectedHour < currentHour ||
      (selectedHour === currentHour && selectedMinute < currentMinute)
    ) {
      // 선택한 시간이 현재 시간보다 이전인 경우 처리하지 않음
      return;
    }

    if (!selectedTimes[0]) {
      setSelectedTimes([time, ""]);
    } else if (!selectedTimes[1]) {
      setSelectedTimes([selectedTimes[0], time]);
    } else {
      // 두 개의 시간 선택 완료
    }
  };

  const isTimeSelected = (time: any) => {
    return (
      selectedTimes[0] === time ||
      (selectedTimes[1] && time > selectedTimes[0] && time < selectedTimes[1])
    );
  };

  const handleSave = () => {
    if (selectedTimes[0] && selectedTimes[1]) {
      // 두 개의 시간 선택이 완료되면 유효성을 확인하고 저장
      const time1 = selectedTimes[0];
      const time2 = selectedTimes[1];

      // 여기서 time1과 time2의 유효성을 확인하고 원하는 조건(30분 단위 등)을 충족하는지 확인합니다.
      // 조건을 충족하지 않으면 사용자에게 알림을 표시하거나 다시 선택하도록 요청할 수 있습니다.
    }
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        horizontal
        data={timeSlots}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleTimeSelection(item)}
            disabled={
              // 현재 시간 이전의 시간들을 비활성화
              item <=
              `${currentHour.toString().padStart(2, "0")}:${currentMinute
                .toString()
                .padStart(2, "0")}`
            }
          >
            <Text
              style={{
                margin: 20,
                color: isTimeSelected(item) ? "red" : "black",
                opacity:
                  item <=
                  `${currentHour.toString().padStart(2, "0")}:${currentMinute
                    .toString()
                    .padStart(2, "0")}`
                    ? 0.5
                    : 1,
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Button title="저장" onPress={handleSave} />
    </View>
  );
};

export default TimePicker;
