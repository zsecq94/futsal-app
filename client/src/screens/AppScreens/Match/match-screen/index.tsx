import MatchCategory from '@/components/match/matchcategory'
import theme, { Box } from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import MatchMatchingScreen from '../match-matching-screen'
import MatchMercenaryScreen from '../match-mercenary-screen'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { axiosInstance } from '@/services/config'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const MatchScreen = () => {
  const { user, updateUser } = useUserGlobalStore()
  const [check, setCheck] = useState(0)
  const navigation = useNavigation<any>()

  const data = ['매칭 / 예약', '용병']

  const getNewUser = async () => {
    const newUser = await axiosInstance.get(`users/get-user/${user?.id}`)
    updateUser(newUser.data)
  }

  useEffect(() => {
    if (user) {
      getNewUser()
    }
  }, [])

  const signInMercenary = () => {
    navigation.navigate('MervenarySignIn')
  }

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {data.map((label, index) => (
          <MatchCategory
            label={label}
            check={check}
            num={index}
            setCheck={setCheck}
            key={index}
          />
        ))}
      </Box>
      {check === 0 && <MatchMatchingScreen />}
      {check === 1 && <MatchMercenaryScreen />}
      {check === 1 && (
        <TouchableOpacity
          onPress={signInMercenary}
          style={{
            zIndex: 9,
            position: 'absolute',
            right: 15,
            bottom: 15,
            backgroundColor: theme.colors.green700,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="add-sharp" size={30} color={'white'} />
        </TouchableOpacity>
      )}
    </Box>
  )
}

export default MatchScreen
