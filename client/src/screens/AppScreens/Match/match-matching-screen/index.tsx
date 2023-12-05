import Calendar from '@/components/match/calender'
import Card from '@/components/match/card'
import MatchCard from '@/components/match/match-card'
import MatchModal from '@/components/match/match-modal'
import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import { SocketContext } from '@/context/SocketContext'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, ScrollView, TouchableOpacity } from 'react-native'
import useSWR from 'swr'

const MatchMatchingScreen = () => {
  const navigate = useNavigation<any>()
  const todayDate = moment().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const [checkModal, setCheckModal] = useState(false)
  const [oneData, setOneData] = useState([])
  const [matchCategory, setMatchCategory] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const socket = useContext(SocketContext)

  const {
    data: matchData,
    isLoading: matchDataIsLoading,
    mutate: matchDataMutate,
  } = useSWR(`matchs/get-false-match/${selectedDate}`, fetcher)

  const {
    data: todayData,
    isLoading: isLoadingTodayData,
    mutate: todayDataMutate,
  } = useSWR(`matchs/get-today-date/${selectedDate}`, fetcher)

  const getMatch = async () => {
    await matchDataMutate()
    await todayDataMutate()
  }

  useEffect(() => {
    setMatchCategory('')
    getMatch()
  }, [selectedDate])

  useEffect(() => {
    if (socket) {
      socket.on('update-match', async () => {
        await matchDataMutate()
        await todayDataMutate()
      })
    }

    return () => {
      if (socket) {
        socket.off('update-match')
      }
    }
  }, [socket, matchData, todayData])

  useEffect(() => {
    if (matchCategory) {
      setFilteredData(
        matchData.filter((match: any) => match.place === matchCategory),
      )
    } else {
      setFilteredData(matchData)
    }
  }, [matchCategory, matchData])

  const goMatchSignIn = ({ name }: any) => {
    navigate.navigate('MatchSignIn', { name, selected: selectedDate })
  }

  const toggleModal = (V: any) => {
    setOneData(V)
    setCheckModal(!checkModal)
  }

  const matchCategoryHandle = (place: string) => {
    if (matchCategory === place) {
      setMatchCategory('')
    } else {
      setMatchCategory(place)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Calendar setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      {matchDataIsLoading || !matchData || isLoadingTodayData || !todayData ? (
        <Loader />
      ) : (
        <>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            style={{ gap: 5 }}
          >
            <Box
              width={5}
              height={12}
              style={{ backgroundColor: theme.colors.primary, borderRadius: 5 }}
            />
            <Text
              variant="textXs"
              fontWeight="700"
              style={{ color: theme.colors.gray500 }}
            >
              대기중인 매치
            </Text>
            <Text>/</Text>
            <Box
              width={5}
              height={12}
              style={{
                backgroundColor: theme.colors.green600,
                borderRadius: 5,
              }}
            />
            <Text
              variant="textXs"
              fontWeight="700"
              style={{ color: theme.colors.gray500 }}
            >
              확정된 매치 & 예약
            </Text>
          </Box>
          {todayData?.map((data: any, index: number) => (
            <Box key={index}>
              <Card data={data} idx={index} onPress={goMatchSignIn} />
              <Box height={10} />
            </Box>
          ))}

          <HrTag />
          {matchData.length > 0 ? (
            <Box mx="5">
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box flexDirection="row" style={{ gap: 10 }}>
                  <TouchableOpacity
                    onPress={() => matchCategoryHandle('A')}
                    style={{
                      backgroundColor:
                        matchCategory === 'A'
                          ? theme.colors.green600
                          : theme.colors.gray300,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      p="2"
                      fontWeight="700"
                      style={{
                        color: matchCategory === 'A' ? 'white' : 'black',
                      }}
                    >
                      A구장
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => matchCategoryHandle('B')}
                    style={{
                      backgroundColor:
                        matchCategory === 'B'
                          ? theme.colors.green600
                          : theme.colors.gray300,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      p="2"
                      fontWeight="700"
                      style={{
                        color: matchCategory === 'B' ? 'white' : 'black',
                      }}
                    >
                      B구장
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => matchCategoryHandle('C')}
                    style={{
                      backgroundColor:
                        matchCategory === 'C'
                          ? theme.colors.green600
                          : theme.colors.gray300,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      p="2"
                      fontWeight="700"
                      style={{
                        color: matchCategory === 'C' ? 'white' : 'black',
                      }}
                    >
                      C구장
                    </Text>
                  </TouchableOpacity>
                </Box>
                <Text
                  variant="textXs"
                  fontWeight="700"
                  style={{
                    color: theme.colors.gray500,
                    textAlign: 'center',
                  }}
                >
                  클릭하여 매칭을 신청해주세요!
                </Text>
              </Box>
              {filteredData?.map((V: any, index: number) => (
                <Box key={index}>
                  <Box height={15} />
                  <MatchCard data={V} onPress={() => toggleModal(V)} />
                </Box>
              ))}
            </Box>
          ) : (
            <Text
              p="5"
              variant="textLg"
              fontWeight="700"
              style={{ textAlign: 'center' }}
            >
              아직 매칭이 없어요!
            </Text>
          )}
          <Box height={80} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={checkModal}
            onRequestClose={toggleModal}
          >
            <MatchModal oneData={oneData} toggleModal={toggleModal} />
          </Modal>
        </>
      )}
    </ScrollView>
  )
}

export default MatchMatchingScreen
