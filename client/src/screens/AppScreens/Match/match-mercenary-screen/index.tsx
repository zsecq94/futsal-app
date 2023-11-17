import Calendar from '@/components/match/calender'
import MercenaryCard from '@/components/mercenary/mercenary-card'
import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import React, { useContext, useEffect } from 'react'
import { ScrollView } from 'react-native'
import useSWR from 'swr'
import { SocketContext } from '@/context/SocketContext'

const MatchMercenaryScreen = ({ setSelectedDate, selectedDate }: any) => {
  const socket = useContext(SocketContext)
  const {
    data: mercenaryData,
    isLoading: mercenaryIsLoading,
    mutate: mercenaryMutate,
  } = useSWR(`mercenary/get-one-day/${selectedDate}`, fetcher)
  useEffect(() => {
    if (socket) {
      socket.on('mercenary-update', async () => {
        await mercenaryMutate()
      })
    }

    return () => {
      if (socket) {
        socket.off('mercenary-update')
      }
    }
  }, [socket, mercenaryData])
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />

      {mercenaryIsLoading || !mercenaryData ? (
        <Loader />
      ) : (
        <>
          <Text
            variant="textBase"
            fontWeight="700"
            style={{ textAlign: 'center', color: 'grey' }}
          >
            대기중인 용병...
          </Text>
          {mercenaryData.length > 0 ? (
            mercenaryData.map((V: any, index: number) => (
              <MercenaryCard V={V} key={index} />
            ))
          ) : (
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
              <Text
                p="3"
                variant="textBase"
                fontWeight="700"
                style={{ textAlign: 'center' }}
              >
                용병 신청자가 없습니다!
              </Text>
            </Box>
          )}
          <Box height={30} />
        </>
      )}
    </ScrollView>
  )
}

export default MatchMercenaryScreen
