import React, { useState } from "react";
import theme, { Box, Text } from "@/utils/theme";
import { Pressable, FlatList, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigate = useNavigation();
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text
        variant="text3Xl"
        fontWeight="600"
        style={{
          color: theme.colors.green900,
        }}
      >
        나주 빛가람 풋살
      </Text>
      <Text mt="10" variant="textLg">
        소셜 계정으로 간편하게 이용하세요.
      </Text>
      <Pressable onPress={() => navigate.navigate("KakaoLogin" as never)}>
        <Image
          style={{
            marginTop: 50,
            width: 60,
            height: 60,
          }}
          source={require(`../../../assets/1.png`)}
        />
      </Pressable>
    </Box>
  );
};

export default LoginScreen;
