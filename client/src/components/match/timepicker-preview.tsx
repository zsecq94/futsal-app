import theme, { Box, Text } from "@/utils/theme";
import React from "react";

const TimePickerPreview = ({ data }: any) => {
  // 새벽 6시부터 밤 12시까지의 모든 시간 (30분 단위)
  const times = Array.from({ length: (23.5 - 6) * 2 + 1 }, (_, i) => [
    i * 0.5 + 6,
    i * 0.5 + 6 + 0.5,
  ]);
  const timeText = ["6", "9", "12", "15", "18", "21", "24"];

  return (
    <Box>
      <Box
        flexDirection="row"
        width={"100%"}
        style={{
          justifyContent: "center",
          marginLeft: 0,
          padding: 0,
        }}
      >
        {times.map((time, index) => {
          return (
            <Box key={index} height={15} width={"2.7%"} alignItems="center">
              <Box
                height={15}
                width={"70%"}
                style={{
                  backgroundColor: data?.some(
                    (d: any) => d[0] === time[0] && d[1] === time[1]
                  )
                    ? theme.colors.green700
                    : "lightgray",
                }}
              />
            </Box>
          );
        })}
      </Box>
      <Box flexDirection="row" justifyContent="space-between" width={"100%"}>
        {timeText.map((time, index) => {
          return (
            <Box key={index} alignItems="center">
              <Box>
                <Box height={5} px="1" />
                <Text
                  style={{
                    fontSize: 8,
                  }}
                >
                  {time}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimePickerPreview;
