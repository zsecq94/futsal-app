import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import ApplyCard from "@/components/team/applycard";
import { Socketcontext } from "@/context/SocketContext";
import {
  applyTeamUpdateRequest,
  deleteUserTeamRequest,
  userTeamUpdateRequest,
} from "@/services/api";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const TeamInfoScreen = () => {
  const { user, updateUser } = useUserGlobalStore();
  const navigation = useNavigation();
  const socket = useContext(Socketcontext);
  socket.on(user?.id, (newUserData) => {
    updateUser(newUserData);
  });

  const name = user?.team;
  const { data: teamData, isLoading } = useSWR(
    `teams/get-team/${name}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const { trigger: userTeamUpdate } = useSWRMutation(
    `users/update`,
    userTeamUpdateRequest
  );

  const { trigger: applyTeamUpdate } = useSWRMutation(
    `teams/update-team-apply`,
    applyTeamUpdateRequest
  );

  const { trigger: deleteUserTeam } = useSWRMutation(
    `users/delete-user-team`,
    deleteUserTeamRequest
  );

  const handleApply = async ({ state, id }: any) => {
    const data = {
      id,
      teamData: teamData.name,
    };
    const data2 = {
      user: id,
      team: teamData,
      state: false,
    };
    try {
      if (state) {
        await userTeamUpdate({ ...data });
        await applyTeamUpdate({ ...data2 });
      } else {
        await applyTeamUpdate({ ...data2 });
      }
    } catch (error) {
      console.log("error in handleApply", error);
      throw error;
    }
  };

  const deleteTeam = async () => {
    const data = {
      id: user?.id,
    };
    const res = await deleteUserTeam({ ...data });
    Toast.show({
      type: "error",
      text1: res.message,
    });
    navigation.navigate("TeamSearch");
  };

  if (!teamData || isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Box>
        <Text
          variant="textXl"
          fontWeight="700"
          style={{
            textAlign: "center",
            color: theme.colors.green700,
          }}
        >
          팀 신청 목록
        </Text>
        <Box px="5">
          <HrTag />
        </Box>
        <Box alignItems="center" style={{ gap: 10 }}>
          {teamData?.apply.length > 0 &&
            teamData.apply.map((user: any, idx: number) => {
              return <ApplyCard key={idx} onPress={handleApply} user={user} />;
            })}
        </Box>
      </Box>
      <TouchableOpacity onPress={deleteTeam}>
        <Box height={50} />
        <Box
          alignItems="center"
          style={{
            backgroundColor: "red",
          }}
        >
          <Text
            p="5"
            style={{
              color: "white",
            }}
          >
            팀 탈퇴
          </Text>
        </Box>
        <Box height={50} />
      </TouchableOpacity>
    </Box>
  );
};

export default TeamInfoScreen;
