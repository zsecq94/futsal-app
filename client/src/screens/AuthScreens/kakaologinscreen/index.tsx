import { Box } from "@/utils/theme";
import React from "react";
import WebView from "react-native-webview";
import axios, { AxiosResponse } from "axios";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { REDIRECT_URI, REST_API_KEY } from "@/services/config";
import { userInfo } from "@/services/api";

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

      const user = response.data.kakao_account.profile;
      const res = await userInfo({
        id: response.data.id,
        name: user.nickname,
        thumb: user.thumbnail_image_url,
      });

      updateUser({
        id: res.user.id,
        name: res.user.name,
        thumb: res.user.thumb,
        num: res.user.num,
        team: res.user.team,
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
