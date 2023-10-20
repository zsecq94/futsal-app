import Button from "@/components/shared/button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { Text } from "@/utils/theme";
import React from "react";
import { Pressable } from "react-native";

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
