import theme, { Text } from "@/utils/theme";
import React from "react";
import { TouchableOpacity } from "react-native";

type MatchCategoryProps = {
  label: string;
  check: number;
  num: number;
  setCheck: React.Dispatch<React.SetStateAction<number>>;
};

const MatchCategory = ({ label, setCheck, check, num }: MatchCategoryProps) => {
  return (
    <TouchableOpacity
      onPress={() => setCheck(num)}
      style={{
        width: "33%",
        borderBottomWidth: check === num ? 2 : 0,
        borderBottomColor: check === num ? theme.colors.green700 : "black",
      }}
    >
      <Text
        variant="textLg"
        fontWeight="700"
        p="3"
        style={{
          textAlign: "center",
          color: check === num ? theme.colors.green700 : "black",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default MatchCategory;
