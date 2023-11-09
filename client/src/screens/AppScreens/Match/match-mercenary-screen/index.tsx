import Calendar from '@/components/match/calender'
import Button from '@/components/shared/button'
import { Box, Text } from '@/utils/theme'
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
    </ScrollView>
  )
}

export default MatchMercenaryScreen
