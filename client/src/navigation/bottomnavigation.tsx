import MessageScreen from "@/screens/AppScreens/messagescreen";
import RankingScreen from "@/screens/AppScreens/rankingscreen";
import TeamInfoScreen from "@/screens/AppScreens/teaminfoscreen";
import TeamScreen from "@/screens/AppScreens/teamsearchscreen";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import theme from "@/utils/theme";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MatchNavigation from "./matchnavigation";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { user } = useUserGlobalStore();

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
      {user?.team === null ? (
        <Tab.Screen
          name="TeamSearch"
          component={TeamScreen}
          options={{
            headerShown: false,
            title: "팀 찾기",
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="TeamInfo"
          component={TeamInfoScreen}
          options={{
            headerShown: false,
            title: "팀 보기",
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
      )}

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
