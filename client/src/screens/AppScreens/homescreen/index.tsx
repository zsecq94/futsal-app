import Content from "@/components/Content";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";

const HomeScreen = () => {
  const { updateUser } = useUserGlobalStore();

  const renderItem = ({ item }: any) => <Content data={item} />;
  const data = [
    {
      A: [
        {
          place: "A구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
        {
          place: "A구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
        {
          place: "A구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
        {
          place: "A구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
      ],
      B: [
        {
          place: "B구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
        {
          place: "B구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce11234d",
        },
        {
          place: "B구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "552531wmkd",
        },
      ],
      C: [
        {
          place: "C구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce1o2mdckl1wmkd",
        },
        {
          place: "C구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "12ce11234d",
        },
        {
          place: "C구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "552531wmkd",
        },
        {
          place: "C구장",
          time: "2023.10.22 16:00 ~ 18:00",
          team: ["FCFC", "CFCF"],
          id: "552531wmkd",
        },
      ],
    },
  ];

  return (
    <SafeAreaWrapper>
      <Text variant="textLg" fontWeight="700" ml="5">
        오늘의 구장 현황
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Box height={16} />}
        // keyExtractor={(item) => item.id}
      />
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
