import Calendar from '@/components/match/calender'
import TimePicker from '@/components/match/timepicker'
import MercenaryTimePicker from '@/components/mercenary/time-picker'
import HrTag from '@/components/shared/hrtag'
import { createMercenaryRequest } from '@/services/api'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import theme, { Box, Text } from '@/utils/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import useSWRMutation from 'swr/mutation'

const MatchMervenarySignInScreen = () => {
  const { user } = useUserGlobalStore()
  const route = useRoute<any>()
  const { selected, date } = route.params
  const navigation = useNavigation()

  const [category, setCategory] = useState(0)
  const [userLevel, setUserLevel] = useState('중')
  const [selectedDate, setSelectedDate] = useState(selected)
  const [selectedTimes, setSelectedTimes] = useState([])

  const { trigger: createMercenary } = useSWRMutation(
    `mercenary/create`,
    createMercenaryRequest,
  )

  useEffect(() => {
    setSelectedTimes([])
  }, [selectedDate, category])

  const handleSubmit = async () => {
    if (category === 0) {
      console.log(selectedDate, selectedTimes)
      const res = await createMercenary({
        name: user?.name,
        thumb: user?.thumb,
        level: userLevel,
        date: selectedDate,
        times: selectedTimes,
      })
      console.log(res)
      Toast.show({
        type: res.state,
        text1: res.message,
        visibilityTime: 2000,
      })
      navigation.goBack()
    }
  }

  const validCheck =
    selectedTimes.length === 2 && userLevel.length > 0 && user !== null

  return (
    <Box flex={1}>
      <Box flexDirection="row" alignItems="center">
        <TouchableOpacity
          onPress={() => setCategory(0)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              category === 0 ? 'transparent' : theme.colors.gray300,
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{
              color: category === 0 ? theme.colors.green600 : 'grey',
            }}
          >
            용병 신청
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory(1)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              category === 1 ? 'transparent' : theme.colors.gray300,
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{ color: category === 1 ? theme.colors.green600 : 'grey' }}
          >
            용병 모집
          </Text>
        </TouchableOpacity>
      </Box>
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      {category === 0 && (
        <Box
          mx="5"
          style={{
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
          }}
        >
          <MercenaryTimePicker
            selectedDate={selectedDate}
            selectedTimes={selectedTimes}
            setSelectedTimes={setSelectedTimes}
            date={date}
          />
        </Box>
      )}
      {category === 1 && (
        <Text
          textAlign="center"
          variant="textBase"
          fontWeight="700"
          color="grey"
        >
          항목이 비어있다면 팀 컨텐츠의 투표를 진행해주세요!
        </Text>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={!validCheck}
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: validCheck ? theme.colors.green600 : 'grey',
        }}
      >
        <Text
          p="5"
          fontWeight="700"
          variant="textLg"
          style={{ textAlign: 'center', color: 'white' }}
        >
          용병 신청하기
        </Text>
      </TouchableOpacity>
    </Box>
  )
}

export default MatchMervenarySignInScreen
