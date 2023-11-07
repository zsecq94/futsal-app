import { REDIRECT_URI, REST_API_KEY } from "@/services/config";
import theme, { Box, Text } from "@/utils/theme";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import React from "react";
import { Image, Pressable } from "react-native";

AuthSession.makeRedirectUri();

const LoginScreen = () => {
  const discovery = {
    authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
    tokenEndpoint: "https://kauth.kakao.com/oauth/token",
    revocationEndpoint: "https://kauth.kakao.com/oauth/revoke",
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: REST_API_KEY,
      redirectUri: AuthSession.makeRedirectUri(),
      responseType: "code",
    },
    discovery
  );

  console.log(response);
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
      <Pressable onPress={() => promptAsync()}>
        <Image
          style={{
            marginTop: 50,
            width: 60,
            height: 60,
          }}
          source={require("../../../../assets/images/1.png")}
        />
      </Pressable>
    </Box>
  );
};

export default LoginScreen;
