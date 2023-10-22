import { NavigatorScreenParams } from "@react-navigation/native";

export type RootBottomTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Team: undefined;
  Reservation: undefined;
  Rank: undefined;
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
