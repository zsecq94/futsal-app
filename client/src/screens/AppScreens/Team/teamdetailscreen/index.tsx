import Button from "@/components/shared/button";
import { Box, Text } from "@/utils/theme";
import { useRoute } from "@react-navigation/native";
import React from "react";

const TeamDetailScreen = () => {
  const route = useRoute();
  const { team }: any = route.params;
  console.log(team);

  const applyTeam = () => {
    console.log("신청");
  };
  return (
    <Box>
      <Box alignItems="center" style={{ gap: 10 }}>
        <Box alignItems="center">
          <Text fontWeight="700" variant="text2Xl">
            팀 이름
          </Text>
          <Text fontWeight="700" variant="textBase">
            {team.teamName}
          </Text>
        </Box>
        <Box alignItems="center">
          <Text fontWeight="700" variant="text2Xl">
            팀장
          </Text>
          <Text fontWeight="700" variant="textBase">
            {team.leader}
          </Text>
        </Box>
        <Box alignItems="center">
          <Text fontWeight="700" variant="text2Xl">
            팀원 수
          </Text>
          <Text fontWeight="700" variant="textBase">
            {team.count}명
          </Text>
        </Box>
      </Box>
      <Box px="20">
        <Button label="팀 신청" onPress={applyTeam} />
      </Box>
    </Box>
  );
};

export default TeamDetailScreen;
