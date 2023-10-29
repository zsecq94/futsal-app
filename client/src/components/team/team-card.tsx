import { Box, Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity, Image } from "react-native";

const TeamCard = ({ team }: any) => {
  // console.log(team);
  return (
    <TouchableOpacity
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
      <Box flexDirection="row" alignItems="center" style={{ gap: 15 }}>
        <Image
          source={{ uri: team.teamImg }}
          width={30}
          height={30}
          style={{ borderRadius: 50 }}
        />
        <Text variant="textBase" fontWeight="700">
          {team.teamName}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default TeamCard;
