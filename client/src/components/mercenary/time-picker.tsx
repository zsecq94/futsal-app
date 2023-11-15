import theme, { Box, Text } from '@/utils/theme'
import React from 'react'

import { ScrollView, TouchableOpacity } from 'react-native'

const MercenaryTimePicker = ({
  selectedDate,
  selectedTimes,
  setSelectedTimes,
  date,
}: any) => {
  // 선택 날짜가 오늘이면 현재시간부터 24시까지 아니면 6시부터 24시까지 times배열생성
  let currHour = 6
  if (date.todayDate === selectedDate) {
    let minute = Number(date.todayTime.todayMinute) < 30 ? 0.5 : 1
    currHour = Number(date.todayTime.todayHour) + minute

    if (currHour < 6) {
      currHour = 6
    }
  }

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

  // 시간 상태 관리
  const handlePress = (time: any) => {
    if (selectedTimes.length < 2) {
      if (selectedTimes.length === 1) {
        if (time[0] === selectedTimes[0][0]) {
          setSelectedTimes([])
          return
        }
        if (time[0] < selectedTimes[0][0]) {
          setSelectedTimes([time, ...selectedTimes])
        } else {
          setSelectedTimes([...selectedTimes, time])
        }
      } else {
        setSelectedTimes([time])
      }
    } else {
      setSelectedTimes([time])
    }
  }

  return (
    <Box style={{ padding: 20 }}>
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
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            운동 가능한 시간을 최대로 선택해주세요!
          </Text>
        )}
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.length < 3
          ? null
          : times.map((time, index) => {
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
                  <TouchableOpacity onPress={() => handlePress(time)}>
                    <Box
                      height={30}
                      width={60}
                      style={{
                        backgroundColor: isSelected
                          ? theme.colors.green700
                          : theme.colors.gray200,
                        borderLeftWidth: 1,
                        borderColor: 'white',
                        borderTopLeftRadius: index === 0 ? 10 : 0,
                        borderBottomLeftRadius: index === 0 ? 10 : 0,
                        borderTopRightRadius:
                          index === times.length - 1 ? 10 : 0,
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
                        <Text style={{ color: 'black' }}>
                          {formatTime(time[0])}
                        </Text>
                        <Text style={{ color: 'black' }}>{time[1]}</Text>
                      </Box>
                    )}
                    {index !== 0 && index !== times.length - 1 && (
                      <Text style={{ color: 'black' }}>
                        {formatTime(time[0])}
                      </Text>
                    )}
                    {index === 0 && (
                      <Text style={{ marginLeft: 17, color: 'black' }}>
                        {formatTime(time[0])}
                      </Text>
                    )}
                  </Box>
                </Box>
              )
            })}
      </ScrollView>
    </Box>
  )
}

export default MercenaryTimePicker
