import { Box } from "@/utils/theme";
import React from "react";
import WebView from "react-native-webview";
import axios, { AxiosResponse } from "axios";
import useUserGlobalStore from "@/store/useUserGlobalStore";

const REST_API_KEY = "1ff96c0aa43f9b0c4db00ccaf3e6da4b";
const REDIRECT_URI = "http://192.168.219.101:19006/Home";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLogin = () => {
  const { updateUser } = useUserGlobalStore();

  const KakaoLoginWebView = (data: string) => {
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      requestToken(authorize_code);
    }
  };

  const requestToken = async (authorize_code: string): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        null,
        {
          params: {
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: authorize_code,
          },
        }
      );
      const AccessToken = response.data.access_token;
      getUserInfo(AccessToken);
    } catch (error) {
      console.log("Error in requestToken");
      throw error;
    }
  };

  const getUserInfo = async (accessToken: string): Promise<void> => {
    try {
      const response: AxiosResponse = await axios.get(
        "https://kapi.kakao.com/v2/user/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userInfo = response.data.kakao_account.profile;
      updateUser({
        name: userInfo.nickname,
        thum: userInfo.thumbnail_image_url,
      });
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      throw error;
    }
  };

  return (
    <Box style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        domStorageEnabled={true}
        useWebKit={true}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          KakaoLoginWebView(event.nativeEvent["url"]);
        }}
      />
    </Box>
  );
};

export default KakaoLogin;
