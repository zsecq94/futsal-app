import MatchCategory from '@/components/match/matchcategory'
import { axiosInstance } from '@/services/config'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { Box } from '@/utils/theme'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import MatchMatchingScreen from '../match-matching-screen'
import MatchMercenaryScreen from '../match-mercenary-screen'

const MatchScreen = () => {
  const { user, updateUser } = useUserGlobalStore()
  const [check, setCheck] = useState(0)
  const todayDate = moment().format('YYYY-MM-DD')
  const todayHour = moment().format('HH')
  const todayMinute = moment().format('mm')
  const [selectedDate, setSelectedDate] = useState(todayDate)

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

  const date = {
    todayDate: todayDate,
    todayTime: {
      todayHour: todayHour,
      todayMinute: todayMinute,
    },
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
      {check === 1 && (
        <MatchMercenaryScreen
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </Box>
  )
}

export default MatchScreen
