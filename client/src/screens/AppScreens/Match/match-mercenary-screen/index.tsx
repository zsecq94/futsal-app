import Calendar from '@/components/match/calender'
import MercenaryCard from '@/components/mercenary/mercenary-card'
import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import React, { useContext, useEffect } from 'react'
import { ScrollView, Dimensions, TextInput } from 'react-native'
import useSWR from 'swr'
import { SocketContext } from '@/context/SocketContext'

const MatchMercenaryScreen = ({ setSelectedDate, selectedDate }: any) => {
  const socket = useContext(SocketContext)
  const screenHeight = Dimensions.get('window').height
  const date = new Date(selectedDate)
  const day = date.getDay()
  const days = ['일', '월', '화', '수', '목', '금', '토']
  const today = days[day]
  const todayColor =
    today === '토' ? theme.colors.blue700 : today === '일' ? 'red' : 'black'

  return (
    <Box flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Calendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
        />
      </ScrollView>
      <ScrollView
        style={{
          marginHorizontal: 20,
          height: screenHeight - 300,
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
        <Text fontWeight="700" variant="textBase" textAlign="center" p="3">
          {selectedDate}-<Text style={{ color: todayColor }}>{today}</Text>
        </Text>
      </ScrollView>
      <Box height={90} />
      <Box flexDirection="row" style={{ position: 'absolute', bottom: 0 }}>
        <TextInput
          style={{
            height: 70,
            width: '100%',
            backgroundColor: 'white',
          }}
        />
      </Box>
    </Box>
  )
}

export default MatchMercenaryScreen
