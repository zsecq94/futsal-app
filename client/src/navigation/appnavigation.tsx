import MessageScreen from "@/screens/AppScreens/Message/messagescreen";
import RankingScreen from "@/screens/AppScreens/Rank/rankingscreen";
import TeamInfoScreen from "@/screens/AppScreens/Team/teaminfoscreen";
import TeamSearchScreen from "@/screens/AppScreens/Team/teamsearchscreen";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme from "@/utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MatchNavigation from "./matchnavigation";
import TeamNavigation from "./teamnavigation";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const { user } = useUserGlobalStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green700,
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          paddingBottom: 7,
        },
      }}
    >
      <Tab.Screen
        name="MatchStack"
        component={MatchNavigation}
        options={{
          headerShown: false,
          title: "매칭",
          tabBarIcon: ({ color, size }) => (
            <Icon name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RankStack"
        component={RankingScreen}
        options={{
          headerShown: false,
          title: "랭킹",
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TeamStack"
        component={TeamNavigation}
        options={{
          headerShown: false,
          title: "팀 찾기",
          tabBarIcon: ({ color, size }) => (
            <Icon name="people" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MessageStack"
        component={MessageScreen}
        options={{
          headerShown: false,
          title: "메시지",
          tabBarIcon: ({ color, size }) => (
            <Icon name="mail" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={MessageScreen}
        options={{
          headerShown: false,
          title: "내 정보",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
