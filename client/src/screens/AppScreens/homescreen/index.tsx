import Content from "@/components/shared/content";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { ScrollView } from "react-native";

const HomeScreen = () => {
  const data = [
    {
      place: "A구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkda",
    },
    {
      place: "A구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkdb",
    },
    {
      place: "A구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkdc",
    },
    {
      place: "A구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkdd",
    },
    {
      place: "B구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkde",
    },
    {
      place: "B구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce11234df",
    },
    {
      place: "B구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531wmkdg",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce1o2mdckl1wmkdh",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "12ce11234di",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531wmkdk",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531wmkdj4",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531wmkd2j",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "5525361wmkdj",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531w1mkdj",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "5522531wmkdj",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "5572531wmkdj",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "5502531wmkdj",
    },
    {
      place: "C구장",
      time: "16:00 ~ 18:00",
      team: ["FCFC", "CFCF"],
      id: "552531967gwmkdj",
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text variant="textLg" fontWeight="700" ml="5" my="5">
        오늘의 구장 현황
      </Text>

      {data.map((V) => (
        <Box key={V.id}>
          <Content data={V} />
          <Box height={16} />
        </Box>
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
