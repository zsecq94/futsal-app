import MatchCategory from "@/components/match/matchcategory";
import { Box } from "@/utils/theme";
import React, { useState } from "react";
import MatchMatchingScreen from "../match-matching-screen";
import MatchMercenaryScreen from "../match-mercenary-screen";

const MatchScreen = () => {
  const [check, setCheck] = useState(0);
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
