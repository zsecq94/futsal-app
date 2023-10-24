import theme, { Box, Text } from "@/utils/theme";
import React from "react";

const TimePickerPreview = ({ date }: any) => {
  // 새벽 6시부터 밤 12시까지의 모든 시간 (30분 단위)
  const times = Array.from({ length: (24 - 6) * 2 + 1 }, (_, i) => i * 0.5 + 6);

  return (
    <Box>
      <Box
        flexDirection="row"
        width={"100%"}
        style={{
          marginLeft: 1,
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
                  backgroundColor: date.includes(time)
                    ? theme.colors.green700
                    : "lightgray",
                }}
              />
            </Box>
          );
        })}
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        width={"100%"}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        {times.map((time, index) => {
          const isHourMarked = time % 3 === 0;
          return (
            <Box key={index} alignItems="center">
              {isHourMarked && (
                <Box>
                  <Box height={5} />
                  <Text
                    style={{
                      fontSize: 10,
                    }}
                  >
                    {Math.floor(time)}
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimePickerPreview;
