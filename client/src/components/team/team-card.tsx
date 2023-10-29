import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";

const TeamCard = ({ team }: any) => {
  const navigation = useNavigation();
  const handleNavigation = () => {
    navigation.navigate("TeamDetail", { team });
  };
  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={{
        height: 50,
        width: "90%",
        padding: 10,
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
      <Box
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
        style={{ width: "100%" }}
      >
        <Box width={"15%"}>
          <Image
            source={{ uri: team.teamImg }}
            width={30}
            height={30}
            style={{ borderRadius: 50 }}
          />
        </Box>
        <Box width={"25%"}>
          <Text
            style={{ textAlign: "left" }}
            variant="textBase"
            fontWeight="700"
          >
            {team.teamName}
          </Text>
        </Box>
        <Box width={"20%"}>
          <Text
            style={{ textAlign: "center" }}
            variant="textBase"
            fontWeight="700"
          >
            {team.teamLevel}
          </Text>
        </Box>
        <Box width={"20%"}>
          <Text
            style={{ textAlign: "center" }}
            variant="textBase"
            fontWeight="700"
          >
            {team.count}명
          </Text>
        </Box>
        <Box width={"20%"}>
          <Text
            style={{ textAlign: "center" }}
            variant="textBase"
            fontWeight="700"
          >
            {team.score}점
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default TeamCard;
