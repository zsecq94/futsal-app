import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { REDIRECT_URI, REST_API_KEY } from "@/services/config";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Text } from "@/utils/theme";
import React from "react";
import { Pressable } from "react-native";

const URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;
const HomeScreen = () => {
  const { updateUser } = useUserGlobalStore();
  return (
    <SafeAreaWrapper>
      <Text>Home</Text>
      <Pressable
        onPress={() => {
          updateUser(null);
        }}
      >
        <Button label="Logout" />
      </Pressable>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
