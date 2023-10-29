import Button from "@/components/shared/button";
import HrTag from "@/components/shared/hrtag";
import Level from "@/components/shared/level";
import NavigateBack from "@/components/shared/navigate-back";
import { createTeam } from "@/services/api";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme, { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, ScrollView, TextInput } from "react-native";
import Toast from "react-native-toast-message";

const TeamCreateScreen = () => {
  const navigation = useNavigation();
  const [level, setLevel] = useState("");
  const levelData = ["하", "중하", "중", "중상", "상"];
  const { user, updateUser } = useUserGlobalStore();

  const [teamData, setTeamData] = useState({
    teamImg:
      "https://mycar.shinhancard.com/conts/images/mycar/bg_profile_basic.png",
    teamName: "",
    teamLevel: "",
  });

  const isValidKorean = (text: any) => {
    const re = /^[가-힣a-zA-Z0-9~!@#$%^&*()-_+|<>?:{}]*$/;
    return re.test(text);
  };

  const handleLevel = (value: any) => {
    if (value === level) {
      setLevel("");
      setTeamData({ ...teamData, teamLevel: "" });
    } else {
      setLevel(value);
      setTeamData({ ...teamData, teamLevel: value });
    }
  };
  const handleSubmit = async () => {
    try {
      if (validCheck) {
        const res = await createTeam({ teamData, user });
        if (res.res1.state) {
          updateUser({
            id: user.id,
            name: user.name,
            thumb: user.thumb,
            num: user.num,
            team: res.res2.user.team,
            level: user.level,
          });
          Toast.show({
            type: "success",
            text1: res.res1.message,
          });
          navigation.navigate("TeamInfo");
        } else {
          Toast.show({
            type: "error",
            text1: res.res1.message,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "띄어쓰기 사용 불가, 팀 수준 필수 값",
          visibilityTime: 3000,
        });
      }
    } catch (error) {}
  };

  const validCheck =
    teamData.teamName.length > 0 &&
    teamData.teamLevel.length > 0 &&
    isValidKorean(teamData.teamName);

  return (
    <ScrollView>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mx="5"
        mt="3"
      >
        <Text
          variant="text2Xl"
          fontWeight="700"
          style={{
            color: theme.colors.green700,
          }}
        >
          팀 생성하기
        </Text>
        <NavigateBack />
      </Box>
      <HrTag />
      <Box height={20} />
      <Box justifyContent="center" alignItems="center">
        <Box alignItems="center" style={{ gap: 10 }}>
          <Text variant="textXl" fontWeight="700">
            팀 엠블럼
          </Text>
          <Box p="1" style={{ backgroundColor: "white", borderRadius: 100 }}>
            <Image
              source={{ uri: teamData.teamImg }}
              width={100}
              height={100}
              style={{
                borderRadius: 50,
              }}
            />
          </Box>
        </Box>
        <Box height={20} />
        <Box
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
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
          <Box alignItems="center" px="5" pb="5" pt="3" style={{ gap: 10 }}>
            <Text variant="textXl" fontWeight="700">
              팀 이름
            </Text>
            <TextInput
              placeholder="클릭하여 작성..."
              value={teamData.teamName}
              onChangeText={(text) => {
                if (text.length <= 10) {
                  setTeamData({ ...teamData, teamName: text });
                } else {
                  alert("팀 이름은 최대 10자까지 가능합니다.");
                }
              }}
              style={{
                borderRadius: 10,
                paddingHorizontal: 10,
                height: 50,
                width: "100%",
                backgroundColor: theme.colors.gray200,
              }}
            />
          </Box>
        </Box>
        <Box height={20} />
        <Box
          style={{
            width: "90%",
            backgroundColor: "white",
            borderRadius: 10,
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
          <Box alignItems="center" px="5" pb="5" pt="3" style={{ gap: 10 }}>
            <Text variant="textXl" fontWeight="700">
              팀 수준
            </Text>
            <Box flexDirection="row" justifyContent="space-between">
              {levelData.map((V, index) => (
                <Level level={level} key={index} V={V} onPress={handleLevel} />
              ))}
            </Box>
          </Box>
        </Box>
        <Box height={20} />
      </Box>
      <Button label="팀 생성" onPress={handleSubmit} />
      <Box height={20} />
    </ScrollView>
  );
};

export default TeamCreateScreen;
