import theme, { Box, Text } from "@/utils/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";

const MatchDetailScreen = () => {
  const route = useRoute();
  const { data }: any = route.params;
  const navigation = useNavigation();
  console.log(data);

  const goBack = () => {
    navigation.goBack();
  };

  const handleMatch = () => {
    console.log("매칭성사");
  };

  return (
    <Box justifyContent="center" alignItems="center" flex={1}>
      <Box
        style={{
          padding: 10,
          width: "80%",
          height: "50%",
          backgroundColor: "white",
          borderRadius: 20,
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
        <Box alignItems="flex-end">
          <TouchableOpacity onPress={goBack}>
            <Text
              p="2"
              style={{
                backgroundColor: theme.colors.green700,
                borderRadius: 7,
                color: "white",
                fontWeight: "bold",
              }}
            >
              뒤로가기
            </Text>
          </TouchableOpacity>
        </Box>
        <Box height={30} />
        <Box justifyContent="center" alignItems="center">
          <Text>하이</Text>
          <Text>하이</Text>
          <Text>하이</Text>
          <Text>하이</Text>
          <Text>하이</Text>
        </Box>
      </Box>
      <Box height={20} />
      <TouchableOpacity onPress={handleMatch}>
        <Text
          p="2"
          style={{
            backgroundColor: theme.colors.green700,
            borderRadius: 7,
            color: "white",
            fontWeight: "bold",
          }}
        >
          매칭 신청
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default MatchDetailScreen;
