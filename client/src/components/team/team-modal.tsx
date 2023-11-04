import {
  changeTeamLeaderRequest,
  deleteTeamManagerRequest,
  deleteUserTeamRequest,
  updateTeamManagerRequest,
} from "@/services/api";
import theme, { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import useSWRMutation from "swr/mutation";
import TeamMemberCard from "./team-member-card";
import TeamMemberDetail from "./team-member-detail";
import TeamOutModal from "./team-out-modal";

const TeamModal = ({
  teamMember,
  user,
  memberListModal,
  setMemberListModal,
  setLoading,
  teamData,
  modalAnimatedValue,
}: any) => {
  const { width, height } = Dimensions.get("window");
  const [deleteModal, setDeleteModal] = useState(false);
  const [memberDetailModal, setMemberDetailModal] = useState(false);
  const [memberDetail, setMemberDetail] = useState([]);

  const { trigger: deleteUserTeam } = useSWRMutation(
    `users/delete-user-team`,
    deleteUserTeamRequest
  );

  const { trigger: updateTeamManager } = useSWRMutation(
    `teams/update-team-manager`,
    updateTeamManagerRequest
  );

  const { trigger: deleteTeamManager } = useSWRMutation(
    `teams/delete-team-manager`,
    deleteTeamManagerRequest
  );

  const { trigger: changeTeamLeader } = useSWRMutation(
    `teams/change-team-leader`,
    changeTeamLeaderRequest
  );

  const outTeam = async () => {
    setLoading(true);
    const res = await deleteUserTeam({ id: user?.id, teamData });
    if (res) {
      Toast.show({
        type: "error",
        text1: res.message,
        visibilityTime: 2000,
      });
    }
    setDeleteModal(!deleteModal);
    setLoading(false);
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

  return (
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
                  user={user}
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
              changeTeamLeader={changeTeamLeader}
              deleteTeamManager={deleteTeamManager}
              updateTeamManager={updateTeamManager}
              deleteUserTeam={deleteUserTeam}
              setMemberDetailModal={setMemberDetailModal}
              teamData={teamData}
              user={user}
              toggleDetailModal={toggleDetailModal}
              memberDetail={memberDetail}
              setMemberListModal={setMemberListModal}
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
            <TeamOutModal
              user={user}
              teamData={teamData}
              outTeam={outTeam}
              toggleModal={toggleModal}
            />
          </Modal>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default TeamModal;
