import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { Image } from "react-native";

const TeamMemberCard = ({ teamData, member, user }: any) => {
  return (
    <Box
      width={"100%"}
      height={50}
      flexDirection="row"
      alignItems="center"
      style={{
        borderBottomWidth: 1,
        borderColor: theme.colors.gray200,
        backgroundColor: user.id === member.id ? theme.colors.gray200 : "white",
      }}
    >
      <Box
        style={{
          width: "34%",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: member.thumb }}
          width={40}
          height={40}
          borderRadius={40}
        />
      </Box>
      <Box
        style={{
          width: "33%",
          alignItems: "center",
        }}
      >
        <Text>{member.name}</Text>
      </Box>
      <Box
        style={{
          width: "33%",
          alignItems: "center",
        }}
      >
        {teamData.leader === member.name ? (
          <Text fontWeight="700">팀장</Text>
        ) : (
          teamData?.manager.includes(member.id) && (
            <Text fontWeight="700">관리자</Text>
          )
        )}
      </Box>
    </Box>
  );
};

export default TeamMemberCard;
