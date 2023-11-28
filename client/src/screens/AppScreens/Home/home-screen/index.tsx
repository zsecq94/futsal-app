import useUserGlobalStore from '@/store/useUserGlobalStore'
import { Box, Text } from '@/utils/theme'
import { NavigationAction, useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const HomeScreen = () => {
  const { user } = useUserGlobalStore()
  const navigation = useNavigation()
  const handleStack = (str: string) => {
    navigation.navigate(str)
  }
  console.log(user)
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      style={{ gap: 20 }}
    >
      <Box>
        <Text fontWeight="700">반갑습니다 {user?.name}님</Text>
        {user?.team.length !== undefined ? (
          <Text fontWeight="700">
            {user.name}님의 팀은 {user?.team}입니다!
          </Text>
        ) : (
          <Text fontWeight="700">{user?.name}님의 소속팀이 없습니다!</Text>
        )}
      </Box>
      <Box flexDirection="row" style={{ gap: 20 }}>
        <TouchableOpacity
          onPress={() => handleStack('MatchStack')}
          style={styles.touchableStyle}
        >
          <Icon name="flag" size={60} color={'green'} />
          <Text fontWeight="700" variant="textXl">
            매칭
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStack('TeamStack')}
          style={styles.touchableStyle}
        >
          <Icon name="people" size={60} color={'green'} />
          <Text fontWeight="700" variant="textXl">
            팀 찾기
          </Text>
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row" style={{ gap: 20 }}>
        <TouchableOpacity
          onPress={() => handleStack('MessageStack')}
          style={styles.touchableStyle}
        >
          <Icon name="mail" size={60} color={'green'} />
          <Text fontWeight="700" variant="textXl">
            메시지
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleStack('ProfileStack')}
          style={styles.touchableStyle}
        >
          <Icon name="person" size={60} color={'green'} />
          <Text fontWeight="700" variant="textXl">
            내 정보
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  touchableStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
