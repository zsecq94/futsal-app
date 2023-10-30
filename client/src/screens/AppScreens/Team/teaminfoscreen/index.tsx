import HrTag from "@/components/shared/hrtag";
import Loader from "@/components/shared/loader";
import ApplyCard from "@/components/team/applycard";
import { applyTeamUpdateRequest, userTeamUpdateRequest } from "@/services/api";
import { fetcher } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const TeamInfoScreen = () => {
  const { user } = useUserGlobalStore();

  const name = user?.team;
  const { data: teamData, isLoading } = useSWR(
    `teams/getteam/${name}`,
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

  const handleApply = async ({ state, id }: any) => {
    const data2 = {
      user: id,
      team: teamData,
      state: false,
    };
    try {
      if (state) {
        const data = {
          id,
          teamData: teamData.name,
        };
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
    </Box>
  );
};

export default TeamInfoScreen;
