import KakaoLogin from "@/components/login/kakao-login";
import { REDIRECT_URI, REST_API_KEY } from "@/services/config";
import theme, { Box, Text } from "@/utils/theme";
import React from "react";

const LoginScreen = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text
        variant="text3Xl"
        fontWeight="600"
        style={{
          color: theme.colors.green900,
        }}
      >
        빛가람 풋살장
      </Text>
      <Text mt="10" variant="textLg">
        소셜 계정으로 간편하게 이용하세요.
      </Text>
      <Text variant="textLg">소셜 계정으로 간편하게 이용하세요.</Text>
      <KakaoLogin />
    </Box>
  );
};

export default LoginScreen;
