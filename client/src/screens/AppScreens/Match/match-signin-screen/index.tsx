import Calendar from '@/components/match/calender'
import TimePicker from '@/components/match/timepicker'
import HrTag from '@/components/shared/hrtag'
import Level from '@/components/shared/level'
import Loader from '@/components/shared/loader'
import { signMatchRequest } from '@/services/api'
import { fetcher } from '@/services/config'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import theme, { Box, Text } from '@/utils/theme'
import { useNavigation, useRoute } from '@react-navigation/native'
import moment from 'moment'
import React, { useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const MatchSignInScreen = () => {
  const navigate = useNavigation()
  const todayDate = moment().format('YYYY-MM-DD')
  const todayHour = moment().format('HH')
  const todayMinute = moment().format('mm')
  const second = moment().format('ss')
  const route = useRoute()

  const { name, selected }: any = route.params
  const { user } = useUserGlobalStore()

  const userTeam = user?.team
  const levelData = ['하', '중하', '중', '중상', '상']
  const date = {
    todayDate: todayDate,
    todayTime: {
      todayHour: todayHour,
      todayMinute: todayMinute,
    },
  }

  const [selectedDate, setSelectedDate] = useState(selected)
  const [selectedTimes, setSelectedTimes] = useState([])
  const [level, setLevel] = useState('')
  const [categoryCheck, setCategoryCheck] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { trigger: signMatch } = useSWRMutation(`matchs/sign`, signMatchRequest)

  const { data: teamData, isLoading: teamDataIsLoading } = useSWR(
    `teams/get-team/${user?.team}`,
    fetcher,
  )

  const handleSubmit = async () => {
    const submitData = {
      team: userTeam,
      place: name,
      date: selectedDate,
      level: level,
      time: selectedTimes,
      todayTime: todayHour + todayMinute + second,
      state: categoryCheck === 0 ? false : true,
    }
    try {
      setIsLoading(true)
      if (categoryCheck === 0 ? validityCheck : validityCheck2) {
        if (matchManagerCheck) {
          const res = await signMatch(submitData)
          Toast.show({
            type: res.type,
            text1: res.message,
            visibilityTime: 2000,
          })

          navigate.goBack()
        } else {
          Toast.show({
            type: 'error',
            text1: '소속된 팀이 없거나 매칭/예약 권한이 없습니다!',
            visibilityTime: 2000,
          })
        }
      } else {
        Toast.show({
          type: 'error',
          text1: '선택사항을 모두 선택해주세요',
          visibilityTime: 2000,
        })
      }
      setIsLoading(false)
    } catch (error) {
      console.log('error in handleSubmit')
      throw error
    }
  }

  const validityCheck =
    selectedDate && selectedTimes.length == 2 && level.length > 0

  const validityCheck2 = selectedDate && selectedTimes.length == 2

  const matchManagerCheck =
    user?.team !== null &&
    (user?.name === teamData?.leader || teamData?.manager?.includes(user?.id))

  const handleLevel = (level: any) => {
    setLevel(level)
  }

  const handleCategory = (num: number) => {
    setCategoryCheck(num)
  }

  if (isLoading || teamDataIsLoading || !teamData) {
    return <Loader />
  }

  return (
    <Box flex={1}>
      <Box
        p="3"
        style={{
          alignItems: 'center',
          backgroundColor: theme.colors.green600,
        }}
      >
        <Text variant="textLg" fontWeight="700" style={{ color: 'white' }}>
          {name}구장
        </Text>
      </Box>
      <Box flexDirection="row" width={'100%'}>
        <TouchableOpacity
          onPress={() => handleCategory(0)}
          style={{
            width: '50%',
            backgroundColor:
              categoryCheck === 0 ? 'transparent' : theme.colors.gray300,
          }}
        >
          <Text
            fontWeight="700"
            variant="textXl"
            p="3"
            style={{
              textAlign: 'center',
              color: categoryCheck === 0 ? theme.colors.green600 : 'grey',
            }}
          >
            매칭
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCategory(1)}
          style={{
            width: '50%',
            backgroundColor:
              categoryCheck === 1 ? 'transparent' : theme.colors.gray300,
          }}
        >
          <Text
            fontWeight="700"
            variant="textXl"
            p="3"
            style={{
              textAlign: 'center',
              color: categoryCheck === 1 ? theme.colors.green600 : 'grey',
            }}
          >
            예약
          </Text>
        </TouchableOpacity>
      </Box>
      <ScrollView
        style={{
          paddingVertical: 20,
        }}
      >
        <Calendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
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
          <TimePicker
            categoryCheck={categoryCheck}
            selectedTimes={selectedTimes}
            selectedDate={selectedDate}
            date={date}
            setSelectedTimes={setSelectedTimes}
            name={name}
          />
        </Box>
        <Box height={20} />
        {categoryCheck === 0 && (
          <Box
            py="3"
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
            <Text
              py="2"
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              매칭 상대 실력 선택
            </Text>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              m="2"
              px="5"
            >
              {levelData.map((V, index) => (
                <Level level={level} key={index} V={V} onPress={handleLevel} />
              ))}
            </Box>
          </Box>
        )}
        <Box height={120} />
      </ScrollView>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={
          categoryCheck === 0
            ? !validityCheck
            : categoryCheck === 1 && !validityCheck2
        }
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor:
            categoryCheck === 0 && validityCheck
              ? theme.colors.green600
              : categoryCheck === 1 && validityCheck2
              ? theme.colors.green600
              : 'grey',
        }}
      >
        <Text
          p="5"
          fontWeight="700"
          variant="textLg"
          style={{ textAlign: 'center', color: 'white' }}
        >
          신청하기
        </Text>
      </TouchableOpacity>
    </Box>
  )
}

export default MatchSignInScreen
