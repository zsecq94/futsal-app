import Button from "@/components/shared/button";
import HrTag from "@/components/shared/hrtag";
import Level from "@/components/shared/level";
import NavigateBack from "@/components/shared/navigate-back";
import theme, { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import {
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { createTeam } from "@/services/api";
import { useNavigation } from "@react-navigation/native";
import FormData from "form-data";

const sampleImgUrl =
  "https://mycar.shinhancard.com/conts/images/mycar/bg_profile_basic.png";

const TeamCreateScreen = () => {
  const navigation = useNavigation();
  const [level, setLevel] = useState("");
  const levelData = ["하", "중하", "중", "중상", "상"];
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [teamData, setTeamData] = useState({
    teamImg: {},
    imgPreview: sampleImgUrl,
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
        const res = await createTeam(teamData);
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

  const resetImg = () => {
    setTeamData({ ...teamData, imgPreview: sampleImgUrl });
  };

  const uploadImg = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });
    if (result.canceled) {
      return null;
    }

    const localUri = result.assets[0].uri;
    const filename = localUri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("image", { uri: localUri, name: filename, type });

    setTeamData({ ...teamData, imgPreview: localUri, teamImg: formData });
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
              source={{ uri: teamData.imgPreview }}
              width={100}
              height={100}
              style={{
                borderRadius: 50,
              }}
            />
          </Box>
          <Box flexDirection="row" style={{ gap: 5 }}>
            <TouchableOpacity onPress={uploadImg}>
              <Box
                style={{
                  backgroundColor: theme.colors.green700,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ padding: 10, color: "white", fontWeight: "bold" }}
                >
                  엠블럼 등록
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetImg}>
              <Box
                style={{
                  backgroundColor: theme.colors.green700,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ padding: 10, color: "white", fontWeight: "bold" }}
                >
                  기본 이미지
                </Text>
              </Box>
            </TouchableOpacity>
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
