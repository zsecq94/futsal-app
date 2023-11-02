import Button from "@/components/shared/button";
import { createApplyTeamRequest } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Box, Text } from "@/utils/theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import useSWRMutation from "swr/mutation";

const TeamDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { team }: any = route.params;
  const { user } = useUserGlobalStore();

  const calculateWinRate = (team: any) => {
    const { win, draw, lose } = team;
    const totalGames = win + draw + lose;
    if (totalGames === 0) {
      return 0;
    }
    const winRate = ((win + draw * 0.5) / totalGames) * 100;
    return winRate;
  };
  const winRate = calculateWinRate(team);

  const { trigger, isMutating } = useSWRMutation(
    "teams/update-team-apply",
    createApplyTeamRequest
  );

  const applyTeam = async () => {
    try {
      const data = {
        user,
        team,
        state: true,
      };
      const res = await trigger({
        ...data,
      });
      if (res.state) {
        Toast.show({
          type: "success",
          text1: res.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: res.message,
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log("error in applyTeam", error);
      throw error;
    }
  };
  return (
    <Box flex={1} justifyContent="center">
      <Box
        alignItems="center"
        p="5"
        marginHorizontal="10"
        style={{
          borderRadius: 20,
          gap: 10,
          backgroundColor: "white",
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
          p="1"
          style={{
            backgroundColor: "white",
            borderRadius: 50,
          }}
        >
          <Image
            source={{ uri: team.img }}
            width={100}
            height={100}
            style={{
              borderRadius: 50,
            }}
          />
        </Box>
        <Text fontWeight="700" variant="text2Xl">
          {team.name}
        </Text>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <Text variant="textBase">팀장</Text>
          <Text fontWeight="700" variant="textBase">
            {team.leader}
          </Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <Text variant="textBase">팀원 수</Text>
          <Text fontWeight="700" variant="textBase">
            {team.count}명
          </Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <Text variant="textBase">팀 레이팅</Text>
          <Text fontWeight="700" variant="textBase">
            {team.score}점
          </Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <Text variant="textBase">승률</Text>
          <Text fontWeight="700" variant="textBase">
            {winRate.toFixed(1)}% (
            {`${team.win}승/${team.draw}무/${team.lose}패`})
          </Text>
        </Box>
      </Box>
      <Box height={30} />
      <Box px="20">
        <Button label="팀 신청" onPress={applyTeam} />
      </Box>
    </Box>
  );
};

export default TeamDetailScreen;
