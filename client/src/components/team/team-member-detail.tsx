import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

const TeamMemberDetail = ({
  memberDetail,
  toggleDetailModal,
  user,
  teamData,
  deleteUserTeam,
}: any) => {
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
          alignItems: "center",
          gap: 15,
        }}
      >
        <TouchableOpacity onPress={toggleDetailModal}>
          <Text
            p="1"
            fontWeight="700"
            style={{
              backgroundColor: theme.colors.green700,
              color: "white",
              borderRadius: 5,
            }}
          >
            뒤로가기
          </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: memberDetail.thumb }}
          width={100}
          height={100}
          style={{
            borderRadius: 50,
          }}
        />
        <Text variant="textBase" fontWeight="700">
          {memberDetail.name}
        </Text>
        {user._id !== memberDetail._id && (
          <TouchableOpacity onPress={toggleDetailModal}>
            <Text
              p="2"
              style={{
                backgroundColor: theme.colors.blue400,
                borderRadius: 5,
                color: "white",
                fontWeight: "bold",
              }}
            >
              메시지 보내기
            </Text>
          </TouchableOpacity>
        )}
        <Box flexDirection="row" style={{ gap: 10 }}>
          {user.name === teamData.leader && user._id !== memberDetail._id && (
            <TouchableOpacity onPress={toggleDetailModal}>
              <Text
                p="2"
                style={{
                  backgroundColor: theme.colors.blue400,
                  borderRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                매칭 권한
              </Text>
            </TouchableOpacity>
          )}
          {user.name === teamData.leader && user._id !== memberDetail._id && (
            <TouchableOpacity onPress={toggleDetailModal}>
              <Text
                p="2"
                style={{
                  backgroundColor: theme.colors.blue400,
                  borderRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                팀장 넘기기
              </Text>
            </TouchableOpacity>
          )}
          {user.name === teamData.leader && user._id !== memberDetail._id && (
            <TouchableOpacity
              onPress={async () => {
                toggleDetailModal();
                const res = await deleteUserTeam({
                  id: memberDetail?.id,
                  teamData,
                });
                if (res) {
                  return Toast.show({
                    type: "success",
                    text1: "추방 성공!",
                  });
                }
              }}
            >
              <Text
                p="2"
                style={{
                  backgroundColor: theme.colors.blue400,
                  borderRadius: 5,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                추방 하기
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TeamMemberDetail;
