import MatchCategory from "@/components/match/matchcategory";
import { Box } from "@/utils/theme";
import React, { useEffect, useState } from "react";
import MatchMatchingScreen from "../match-matching-screen";
import MatchMercenaryScreen from "../match-mercenary-screen";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { userInfo } from "@/services/api";

const MatchScreen = () => {
  const [check, setCheck] = useState(0);
  const { user, updateUser } = useUserGlobalStore();
  useEffect(() => {
    const userUpdate = async () => {
      const res = await userInfo({
        id: user?.id,
        name: user?.name,
        thumb: user?.thumb,
      });
      updateUser({
        id: res.user.id,
        name: res.user.name,
        thumb: res.user.thumb,
        num: res.user.num,
        team: res.user.team,
        level: res.user.level,
      });
    };
    userUpdate();
  }, []);

  const data = ["매칭 / 예약", "용병"];

  return (
    <Box>
      <Box flexDirection="row">
        {data.map((label, index) => (
          <MatchCategory
            label={label}
            check={check}
            num={index}
            setCheck={setCheck}
            key={index}
          />
        ))}
      </Box>
      {check === 0 && <MatchMatchingScreen />}
      {check === 1 && <MatchMercenaryScreen />}
    </Box>
  );
};

export default MatchScreen;
