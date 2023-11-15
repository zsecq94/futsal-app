import { SocketContext } from '@/context/SocketContext'
import MessageScreen from '@/screens/AppScreens/Message/message-screen'
import RankingScreen from '@/screens/AppScreens/Rank/ranking-screen'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import theme from '@/utils/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import Icon from 'react-native-vector-icons/Ionicons'
import MatchNavigation from './matchnavigation'
import TeamNavigation from './teamnavigation'
import ProfileScreen from '@/screens/AppScreens/Profile/profiles-creen'

const Tab = createBottomTabNavigator()
const AppNavigation = () => {
  const { user, updateUser } = useUserGlobalStore()
  const navigation = useNavigation<any>()
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (socket) {
      socket.on(`${user?.id}-delete`, (newUser: IAuthUser) => {
        navigation.navigate('TeamStack')
        Toast.show({
          type: 'error',
          text1: '팀에서 추방되었습니다...',
          visibilityTime: 2000,
        })
        updateUser(newUser)
      })

      socket.on(`${user?.id}-update`, (userData: IAuthUser) => {
        updateUser(userData)
      })
    }
  }, [socket])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.green600,
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
          title: '매칭',
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
          title: '랭킹',
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
          title: '팀 찾기',
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
          title: '메시지',
          tabBarIcon: ({ color, size }) => (
            <Icon name="mail" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: '내 정보',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigation
