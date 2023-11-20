import theme, { Box, Text } from '@/utils/theme'
import React, { useContext, useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { fetcher } from '@/services/config'
import { ScrollView, TouchableOpacity } from 'react-native'
import useSWR from 'swr'
import Loader from '../shared/loader'
import { SocketContext } from '@/context/SocketContext'

const TimePicker = ({
  selectedTimes,
  selectedDate,
  date,
  setSelectedTimes,
  name,
  categoryCheck,
}: any) => {
  const socket = useContext(SocketContext)

  const {
    data: onePlaceData,
    isLoading: onePlaceIsLoading,
    mutate: onePlaceMutate,
  } = useSWR(`matchs/get-one-place/${selectedDate}/${name}`, fetcher)

  useEffect(() => {
    if (socket) {
      socket.on('timepicker-update', async () => {
        await onePlaceMutate()
      })
    }

    return () => {
      if (socket) {
        socket.off('timepicker-update')
      }
    }
  }, [socket, onePlaceData])

  useEffect(() => {
    setSelectedTimes([])
  }, [selectedDate, categoryCheck])

  // 선택 날짜가 오늘이면 현재시간부터 24시까지 아니면 6시부터 24시까지 times배열생성
  let currHour = 6
  if (date.todayDate === selectedDate) {
    let minute = Number(date.todayTime.todayMinute) < 30 ? 0.5 : 1
    currHour = Number(date.todayTime.todayHour) + minute

    if (currHour < 6) {
      currHour = 6
    }
  }

  // console.log(onePlaceData);

  // 시간 배열 생성
  const times = Array.from({ length: (23.5 - currHour) * 2 + 1 }, (_, i) => [
    i * 0.5 + currHour,
    i * 0.5 + currHour + 0.5,
  ])

  // 시간 포맷
  const formatTime = (time: any) => {
    let hours = Math.floor(time)
    let minutes = time % 1 > 0 ? '30' : '00'
    return `${hours}:${minutes}`
  }

  // 예약 유효성 체크
  const validCheck = (start: [], end: []) => {
    const time = [start, end]

    const fillGapsInTimes = (dates: number[][]) => {
      let filledDates: number[][] = []
      for (let i = 0; i < dates.length - 1; i += 2) {
        let start = dates[i][0]
        let end = dates[i + 1][1]

        for (let j = start; j < end; j += 0.5) {
          filledDates.push([j, j + 0.5])
        }
      }

      return filledDates
    }

    const newDateList = fillGapsInTimes(time)

    const isTimeInData = (time: any, onePlaceData: any) => {
      if (categoryCheck === 0) {
        for (const range of onePlaceData) {
          const [start, end] = range
          if (time[0] >= start && time[1] <= end) {
            return false // time이 onePlaceData 범위 안에 있으면 false 반환
          }
        }
        return true
      } else {
        for (const range of onePlaceData) {
          const [start, end, state] = range
          if (time[0] === start && state) {
            return false
          }
        }
        return true
      }
    }

    let check = true
    newDateList.forEach((time) => {
      const isTimeNotInData = isTimeInData(time, onePlaceData)
      if (isTimeNotInData === false) {
        check = false
      }
    })
    return check
  }

  const option1 = {
    type: 'error',
    text1:
      categoryCheck === 0
        ? '기본 매칭 신청 시간은 2시간 입니다 ❗'
        : '예약 최대 신청 시간은 3시간 입니다 ❗',
    visibilityTime: 3000,
  }
  const option2 = {
    type: 'error',
    text1: '시간을 다시 선택해주세요 ❗',
    visibilityTime: 3000,
  }

  // 시간 상태 관리
  const handlePress = (time: any) => {
    if (selectedTimes.length < 2) {
      if (selectedTimes.length === 1) {
        const duration = Math.abs(time[0] - selectedTimes[0][0])
        console.log(duration)
        if (categoryCheck === 0 ? duration !== 1.5 : duration > 2.5) {
          Toast.show(option1)
          setSelectedTimes([])
        } else {
          if (time[0] === selectedTimes[0][0]) {
            setSelectedTimes([])
            return
          }
          if (time[0] < selectedTimes[0][0]) {
            const check = validCheck(time, selectedTimes[0])
            if (check) {
              setSelectedTimes([time, ...selectedTimes])
            } else {
              Toast.show(option2)
              setSelectedTimes([])
            }
          } else {
            const check = validCheck(selectedTimes[0], time)
            if (check) {
              setSelectedTimes([...selectedTimes, time])
            } else {
              Toast.show(option2)
              setSelectedTimes([])
            }
          }
        }
      } else {
        setSelectedTimes([time])
      }
    } else {
      setSelectedTimes([time])
    }
  }

  if (!onePlaceData || onePlaceIsLoading) {
    return <Loader />
  }

  return (
    <Box style={{ padding: 10 }}>
      <Box
        style={{
          paddingBottom: 20,
          alignItems: 'center',
        }}
      >
        {selectedTimes.length === 2 ? (
          <Box>
            <Text
              style={{
                fontSize: 20,
              }}
              fontWeight="700"
            >
              {formatTime(selectedTimes[0][0])} ~{' '}
              {formatTime(selectedTimes[1][1])}
            </Text>
          </Box>
        ) : selectedTimes.length === 1 ? (
          <Text
            style={{
              fontSize: 20,
            }}
            fontWeight="700"
          >
            {formatTime(selectedTimes[0][0])} ~{' '}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            시간을 선택하세요!
          </Text>
        )}
        {categoryCheck === 1 ? (
          <Box>
            <Box height={10} />
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{ gap: 10 }}
            >
              <Box
                width={25}
                height={10}
                style={{
                  backgroundColor: theme.colors.gray300,
                  borderRadius: 2,
                }}
              />
              <Box
                width={25}
                height={10}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderRadius: 2,
                }}
              />
              <Text
                fontWeight="700"
                style={{ fontSize: 10, color: theme.colors.gray500 }}
              >
                예약 가능
              </Text>
              <Box
                width={25}
                height={10}
                style={{
                  backgroundColor: 'grey',
                  borderRadius: 2,
                }}
              />
              <Text
                fontWeight="700"
                style={{ fontSize: 10, color: theme.colors.gray500 }}
              >
                예약 불가능
              </Text>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box height={10} />
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{ gap: 10 }}
            >
              <Box
                width={25}
                height={10}
                style={{
                  backgroundColor: theme.colors.gray300,
                  borderRadius: 2,
                }}
              />
              <Text
                fontWeight="700"
                style={{ fontSize: 10, color: theme.colors.gray600 }}
              >
                매치 가능
              </Text>
              <Box
                width={25}
                height={10}
                style={{
                  backgroundColor: 'grey',
                  borderRadius: 2,
                }}
              />
              <Text
                fontWeight="700"
                style={{ fontSize: 10, color: theme.colors.gray500 }}
              >
                매치 불가능
              </Text>
            </Box>
          </Box>
        )}
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.length < 4 ? (
          <Text fontWeight="700">오늘 신청은 마감되었습니다!!!</Text>
        ) : (
          times.map((time, index) => {
            let isSelected = false
            if (selectedTimes.length === 2) {
              const start = Math.min(selectedTimes[0][0], selectedTimes[1][0])
              const end = Math.max(selectedTimes[0][0], selectedTimes[1][0])
              isSelected = time[0] >= start && time[0] <= end
            } else {
              isSelected = selectedTimes.some(
                (selectedTime: number[]) => selectedTime[0] === time[0],
              )
            }

            return (
              <Box key={index}>
                <TouchableOpacity
                  onPress={() => handlePress(time)}
                  disabled={
                    categoryCheck === 1
                      ? onePlaceData?.some(
                          (d: any) => d[0] === time[0] && d[2] === true,
                        )
                      : onePlaceData?.some((d: any) => d[0] === time[0])
                  }
                >
                  <Box
                    height={30}
                    width={40}
                    style={{
                      backgroundColor: isSelected
                        ? theme.colors.green600
                        : categoryCheck === 0 &&
                          onePlaceData?.some((d: any) => d[0] === time[0])
                        ? 'grey'
                        : categoryCheck === 1 &&
                          onePlaceData?.some(
                            (d: any) => d[0] === time[0] && d[2] === true,
                          )
                        ? 'grey'
                        : categoryCheck === 1 &&
                          onePlaceData?.some(
                            (d: any) => d[0] === time[0] && d[2] === false,
                          )
                        ? theme.colors.primary
                        : theme.colors.gray200,

                      borderLeftWidth: 1,
                      borderColor: 'white',
                      borderTopLeftRadius: index === 0 ? 10 : 0,
                      borderBottomLeftRadius: index === 0 ? 10 : 0,
                      borderTopRightRadius: index === times.length - 1 ? 10 : 0,
                      borderBottomRightRadius:
                        index === times.length - 1 ? 10 : 0,
                    }}
                  />
                </TouchableOpacity>
                <Box height={10} />
                <Box
                  style={{
                    marginLeft: -17,
                  }}
                >
                  {index === times.length - 1 && (
                    <Box justifyContent="space-between" flexDirection="row">
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        {formatTime(time[0])}
                      </Text>
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        {time[1]}
                      </Text>
                    </Box>
                  )}
                  {index !== 0 && index !== times.length - 1 && (
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginLeft: 4,
                      }}
                    >
                      {formatTime(time[0])}
                    </Text>
                  )}
                  {index === 0 && (
                    <Text
                      style={{
                        fontSize: 10,
                        marginLeft: 17,
                        fontWeight: 'bold',
                      }}
                    >
                      {formatTime(time[0])}
                    </Text>
                  )}
                </Box>
              </Box>
            )
          })
        )}
      </ScrollView>
    </Box>
  )
}

export default TimePicker
