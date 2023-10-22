import Header from "@/layout/header";
import HomeScreen from "@/screens/AppScreens/homescreen";
import MatchScreen from "@/screens/AppScreens/matchscreen";
import MessageScreen from "@/screens/AppScreens/messagescreen";
import RankingScreen from "@/screens/AppScreens/rankingscreen";
import TeamInfoScreen from "@/screens/AppScreens/teaminfoscreen";
import TeamScreen from "@/screens/AppScreens/teamscreen";
import useUserGlobalStore from "@/store/useUserGlobalStore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const { user } = useUserGlobalStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 7,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="매칭"
        component={MatchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="flag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="랭킹"
        component={RankingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="trophy" size={size} color={color} />
          ),
        }}
      />
      {user?.team === null ? (
        <Tab.Screen
          name="팀 찾기"
          component={TeamScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="팀 보기"
          component={TeamInfoScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="people" size={size} color={color} />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="메시지"
        component={MessageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="mail" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
