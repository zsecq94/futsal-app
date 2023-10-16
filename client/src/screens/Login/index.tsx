import React from "react";
import theme, { Box, Text } from "@/utils/theme";
import { Pressable, Image } from "react-native";

const Login = () => {
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
      <Box flexDirection="row" style={{ gap: 20 }}>
        <Pressable>
          <Image
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
            }}
            source={require("client/assets/kakao.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
            }}
            source={require("client/assets/naver.png")}
          />
        </Pressable>
        <Pressable>
          <Image
            style={{
              marginTop: 20,
              width: 60,
              height: 60,
            }}
            source={require("client/assets/google.png")}
          />
        </Pressable>
      </Box>
    </Box>
  );
};

export default Login;
