import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import ApplyCard from "@/components/team/applycard";
import TeamMemberCard from "@/components/team/team-member-card";
import TeamMemberDetail from "@/components/team/team-member-detail";
import TeamMemberModal from "@/components/team/team-member-modal";
import { SocketContext } from "@/context/SocketContext";
import {
  applyTeamUpdateRequest,
  deleteUserTeamRequest,
  userTeamUpdateRequest,
} from "@/services/api";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const TeamInfoScreen = () => {
  const { user, updateUser } = useUserGlobalStore();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const socket = useContext(SocketContext);
  const modalAnimatedValue = useState(new Animated.Value(1))[0];
  const { width, height } = Dimensions.get("window");
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberListModal, setMemberListModal] = useState(false);
  const [memberDetailModal, setMemberDetailModal] = useState(false);
  const [memberDetail, setMemberDetail] = useState([]);

  const {
    data: teamData,
    isLoading: teamDataIsLoading,
    mutate,
  } = useSWR(`teams/get-team/${user?.team}`, fetcher);

  const { trigger: userTeamUpdate } = useSWRMutation(
    `users/update`,
    userTeamUpdateRequest
  );

  const { trigger: applyTeamUpdate } = useSWRMutation(
    `teams/update-team-apply`,
    applyTeamUpdateRequest
  );

  const {
    data: teamMember,
    isLoading: teamMemberIsLoading,
    mutate: teamMemberMutate,
  } = useSWR(`users/get-member/${teamData?.name}`, fetcher);

  const { trigger: deleteUserTeam } = useSWRMutation(
    `users/delete-user-team`,
    deleteUserTeamRequest
  );

  useEffect(() => {
    if (socket) {
      socket.on(`${user?.name}-apply-update`, async () => {
        try {
          setLoading(false);
          await mutate();
          await teamMemberMutate();
        } catch (error) {}
      });
      socket.on(`${user?.id}-delete`, (newUser: IAuthUser) => {
        updateUser(newUser);
      });
      socket.on(`${teamData?.name}-update`, async () => {
        await teamMemberMutate();
      });
    }

    return () => {
      if (socket) {
        socket.off(`${user?.id}-apply-update`);
        socket.off(`${user?.id}-delete`);
        socket.off(`${teamData?.name}-update`);
      }
    };
  }, [socket]);

  const deleteTeam = async () => {
    setLoading(true);
    const res = await deleteUserTeam({ id: user?.id, teamData });
    if (res) {
      Toast.show({
        type: "error",
        text1: res.message,
      });
      navigation.navigate("Team");
    }
    setLoading(false);
    setDeleteModal(!deleteModal);
  };

  const handleApply = async ({ state, id }: any) => {
    try {
      if (state) {
        setLoading(true);
        const res = await userTeamUpdate({ id, teamData: teamData.name });
        await applyTeamUpdate({
          user: id,
          team: teamData,
          state: false,
          count: true,
        });
        if (res.state) {
          Toast.show({
            type: "success",
            text1: res.message,
          });
        } else {
          Toast.show({
            type: "error",
            text1: res.message,
          });
        }
      } else {
        setLoading(true);
        await applyTeamUpdate({
          user: id,
          team: teamData,
          state: false,
          count: false,
        });
      }
    } catch (error) {
      console.log("error in handleApply", error);
      throw error;
    }
  };

  const handleModal = () => {
    setMemberListModal(true);
    Animated.timing(modalAnimatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(modalAnimatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMemberListModal(false);
    });
  };

  const modalTranslateX = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.7],
  });

  const toggleModal = () => {
    setDeleteModal(!deleteModal);
  };

  const toggleDetailModal = (member: any) => {
    if (member) {
      setMemberDetail(member);
    }
    setMemberDetailModal(!memberDetailModal);
  };

  if (!teamData || teamDataIsLoading || loading || teamMemberIsLoading) {
    return <Loader />;
  }

  return (
    <Box>
      <Box justifyContent="space-between" flexDirection="row" px="5" mt="5">
        <Text
          variant="textXl"
          fontWeight="700"
          style={{
            textAlign: "center",
            color: theme.colors.green700,
          }}
        >
          {teamData.name}
        </Text>
        <TouchableOpacity
          onPress={handleModal}
          style={{
            backgroundColor: theme.colors.green700,
            borderRadius: 10,
          }}
        >
          <Text
            p="1"
            variant="textBase"
            fontWeight="700"
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            {teamData?.manager.includes(user?.id) ? "팀원관리" : "팀원보기"}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="none"
          transparent={true}
          visible={memberListModal}
          onRequestClose={hideModal}
        >
          <Animated.View
            style={{
              transform: [{ translateX: modalTranslateX }],
              position: "absolute",
              right: 0,
              top: 0,
              width: width * 0.7,
              height: height,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity onPress={hideModal}>
              <Text
                p="2"
                variant="text2Xl"
                fontWeight="700"
                style={{
                  color: "white",
                  backgroundColor: theme.colors.green700,
                  textAlign: "center",
                }}
              >
                나가기
              </Text>
            </TouchableOpacity>
            <ScrollView>
              {teamMember?.map((member: any, idx: any) => {
                return (
                  <TouchableOpacity
                    key={member.id}
                    onPress={() => toggleDetailModal(member)}
                  >
                    <TeamMemberCard
                      teamData={teamData}
                      idx={idx}
                      member={member}
                    />
                  </TouchableOpacity>
                );
              })}
              <Modal
                animationType="none"
                transparent={true}
                visible={memberDetailModal}
                onRequestClose={toggleDetailModal}
              >
                <TeamMemberDetail
                  deleteUserTeam={deleteUserTeam}
                  setMemberDetailModal={setMemberDetailModal}
                  teamData={teamData}
                  user={user}
                  toggleDetailModal={toggleDetailModal}
                  memberDetail={memberDetail}
                />
              </Modal>
              <Box height={20} />
              <TouchableOpacity
                onPress={toggleModal}
                style={{
                  marginHorizontal: 80,
                }}
              >
                <Text
                  p="3"
                  fontWeight="700"
                  style={{
                    textAlign: "center",
                    borderRadius: 10,
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  팀 탈퇴
                </Text>
                <Box height={50} />
              </TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={true}
                visible={deleteModal}
                onRequestClose={toggleModal}
              >
                <TeamMemberModal
                  deleteTeam={deleteTeam}
                  toggleModal={toggleModal}
                />
              </Modal>
            </ScrollView>
          </Animated.View>
        </Modal>
      </Box>
      <Box>
        <HrTag />
      </Box>
      {teamData?.manager.includes(user?.id) && (
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
            {teamData?.apply.map((user: any, idx: number) => {
              return <ApplyCard key={idx} onPress={handleApply} user={user} />;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TeamInfoScreen;
