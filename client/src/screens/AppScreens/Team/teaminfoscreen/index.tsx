import HrTag from "@/components/shared/hrtag";
import ApplyCard from "@/components/team/applycard";
import { getApplyData, getApplyUser, userTeamUpdate } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import React, { useEffect, useState } from "react";

const TeamInfoScreen = () => {
  const { user } = useUserGlobalStore();
  const [applyUser, setApplyUser] = useState([]);

  const getApply = async () => {
    const res = await getApplyData({ name: user?.team });
    if (res.teamData.apply) {
      let users: [] = [];
      for (let id of res.teamData.apply) {
        const applyUser = await getApplyUser({ id });
        users.push(applyUser);
      }
      setApplyUser(users);
    }
  };
  useEffect(() => {
    getApply();
  }, []);

  const handleApply = async ({ state, id }: any) => {
    try {
      if (state) {
        const res = await userTeamUpdate({ id, team: user?.team });
        if (res.state) {
          getApply();
        }
      } else {
      }
    } catch (error) {
      console.log("error in handleApply", error);
      throw error;
    }
  };

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
          {applyUser.length > 0 &&
            applyUser.map((user, idx) => {
              return <ApplyCard key={idx} onPress={handleApply} user={user} />;
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default TeamInfoScreen;
