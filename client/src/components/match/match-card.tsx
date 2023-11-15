import { TouchableOpacity } from 'react-native'
import React from 'react'
import theme, { Box, Text } from '@/utils/theme'
import LinearGradient from 'react-native-linear-gradient'

const MatchCard = ({ data, onPress }: any) => {
  const convertTime = (decimalTime: any) => {
    const hours = Math.floor(decimalTime)
    const minutes = (decimalTime - hours) * 60
    return `${hours}:${minutes === 0 ? '00' : minutes}`
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flexDirection="row"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 50,
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
          variant="textBase"
          fontWeight="700"
          style={{ color: 'black', width: '20%', textAlign: 'center' }}
        >
          구장 : {data.place}
        </Text>
        <Text
          variant="textBase"
          fontWeight="700"
          style={{ color: 'black', width: '50%', textAlign: 'center' }}
        >
          시간 : {convertTime(data.time[0][0])} ~ {convertTime(data.time[1][1])}
        </Text>
        <Text
          variant="textBase"
          fontWeight="700"
          style={{ color: 'black', width: '30%', textAlign: 'center' }}
        >
          실력 : {data.level}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}

export default MatchCard
