import Calendar from '@/components/match/calender'
import HrTag from '@/components/shared/hrtag'
import theme, { Text } from '@/utils/theme'
import moment from 'moment'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'

const MatchMercenaryScreen = () => {
  const todayDate = moment().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(todayDate)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 8,
      }}
    >
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        용병 구인
      </Text>
      <HrTag />
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        용병 구직
      </Text>
      <HrTag />
    </ScrollView>
  )
}

export default MatchMercenaryScreen
