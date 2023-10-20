import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Text } from "@/utils/theme";
import React from "react";
import { Pressable } from "react-native";

const MessageScreen = () => {
  return (
    <SafeAreaWrapper>
      <Text>마이 프로필 입니다.</Text>
    </SafeAreaWrapper>
  );
};

export default MessageScreen;
