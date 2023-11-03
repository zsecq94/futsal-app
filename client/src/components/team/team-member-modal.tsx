import React from "react";
import theme, { Box, Text } from "@/utils/theme";
import { TouchableOpacity } from "react-native";

const TeamMemberModal = ({ deleteTeam, toggleModal }: any) => {
  return (
    <Box
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text
          variant="textBase"
          fontWeight="700"
          style={{ textAlign: "center" }}
        >
          정말로 팀을 탈퇴하시겠습니까?
        </Text>
        <Box height={30} />
        <Box
          flexDirection="row"
          mx="10"
          style={{ gap: 50 }}
          justifyContent="center"
        >
          <TouchableOpacity onPress={deleteTeam}>
            <Text
              p="2"
              style={{
                backgroundColor: "red",
                borderRadius: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              네
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal}>
            <Text
              p="2"
              style={{
                backgroundColor: theme.colors.green700,
                borderRadius: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              아니요
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamMemberModal;
