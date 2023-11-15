import Calendar from '@/components/match/calender'
import MercenaryCard from '@/components/mercenary/mercenary-card'
import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import React from 'react'
import { ScrollView } from 'react-native'
import useSWR from 'swr'

const MatchMercenaryScreen = ({ setSelectedDate, selectedDate }: any) => {
  const {
    data: mercenaryData,
    isLoading,
    mutate,
  } = useSWR(`mercenary/get-one-day/${selectedDate}`, fetcher)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 8,
      }}
    >
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <HrTag />
      {isLoading || !mercenaryData ? (
        <Loader />
      ) : (
        <>
          <Box height={10} />
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
          {mercenaryData.length > 0 ? (
            mercenaryData.map((V: any, index: number) => (
              <MercenaryCard V={V} key={index} />
            ))
          ) : (
            <Text
              p="4"
              variant="textLg"
              fontWeight="700"
              style={{ textAlign: 'center' }}
            >
              용병 신청자가 없습니다!
            </Text>
          )}
          <Box height={30} />
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
        </>
      )}
    </ScrollView>
  )
}

export default MatchMercenaryScreen
