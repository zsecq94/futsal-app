import MessageScreen from "@/screens/AppScreens/Message/messagescreen";
import RankingScreen from "@/screens/AppScreens/Rank/rankingscreen";
import theme from "@/utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MatchNavigation from "./matchnavigation";
import TeamNavigation from "./teamnavigation";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: theme.colors.green700,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          paddingBottom: 7,
        },
      }}
    >
      <Tab.Screen
        name="Match"
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
        name="Rank"
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
        name="TeamSearch"
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
        name="Message"
        component={MessageScreen}
        options={{
          headerShown: false,
          title: "메시지",
          tabBarIcon: ({ color, size }) => (
            <Icon name="mail" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
