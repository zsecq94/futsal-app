import theme, { Box, Text } from "@/utils/theme";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import TimePickerPreview from "./timepicker-preview";
import CardCategory from "./cardcategory";
import moment from "moment";
import { getTodayDate } from "@/services/api";

const Card = ({ V, onPress }: any) => {
  const [todayDates, setTodayDates] = useState([]);
  const todayDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    const getDate = async () => {
      try {
        const newName = V + todayDate;
        const res = await getTodayDate({ newName, state: true });

        setTodayDates(res);
      } catch (error) {
        console.log("error in getCount");
        throw error;
      }
    };
    getDate();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => onPress(V)}
      style={{
        alignItems: "center",
      }}
    >
      <Box
        mt="2"
        py="2"
        px="5"
        justifyContent="space-between"
        style={{
          width: "90%",
          height: 100,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="textBase">{V} 구장</Text>
          <Text variant="textBase">{todayDates.count} 경기</Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <CardCategory V={V} />
        </Box>
        <Box height={5} />
        <TimePickerPreview date={todayDates?.times} />
      </Box>
    </TouchableOpacity>
  );
};

export default Card;
