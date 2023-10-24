import { NavigatorScreenParams } from "@react-navigation/native";

export type RootBottomTabParamList = {
  Match: NavigatorScreenParams<HomeStackParamList>;
  Rank: undefined;
  TeamSearch: undefined;
  TeamInfo: undefined;
  Message: undefined;
};

export type HomeStackParamList = {
  navigate: any;
  Home: undefined;
  EditTask: undefined;
};

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList>;
};
