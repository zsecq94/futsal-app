import Calendar from '@/components/match/calender'
import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import React from 'react'
import { ScrollView } from 'react-native'
import useSWR from 'swr'

const MatchMercenaryScreen = ({ setSelectedDate, selectedDate }: any) => {
  const { data, isLoading, mutate } = useSWR(
    `mercenary/get-one-day/${selectedDate}`,
    fetcher,
  )

  console.log(data)

  if (isLoading || !data) {
    return <Loader />
  }

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
        용병 대기중...
      </Text>
      <HrTag />
      <Box p="5">
        {data.map((V: any, index: number) => (
          <Text style={{ color: 'black' }}>{V.name}</Text>
        ))}
      </Box>
      <Text
        ml="5"
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: theme.colors.green700,
        }}
      >
        용병 모집중...
      </Text>
      <HrTag />
    </ScrollView>
  )
}

export default MatchMercenaryScreen
