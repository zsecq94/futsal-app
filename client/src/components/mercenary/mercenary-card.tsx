import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Text } from '@/utils/theme'
import Icon from 'react-native-vector-icons/Ionicons'

const MercenaryCard = ({ V }: any) => {
  const formatTime = (time: any) => {
    let hours = Math.floor(time)
    let minutes = time % 1 > 0 ? '30' : '00'
    return `${hours}:${minutes}`
  }

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        marginHorizontal: 20,
      }}
    >
      <Box
        mt="2"
        py="2"
        px="5"
        flexDirection="row"
        alignItems="center"
        style={{
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
        <Box width={'10%'}>
          <Image
            source={{ uri: V.thumb }}
            width={35}
            height={35}
            borderRadius={35}
          />
        </Box>
        <Box
          width={'20%'}
          alignItems="center"
          flexDirection="row"
          style={{ gap: 5 }}
        >
          <Text fontWeight="700">{V.name}</Text>
        </Box>
        <Box
          width={'50%'}
          alignItems="center"
          flexDirection="row"
          style={{ gap: 5 }}
        >
          <Text fontWeight="700">
            가능한 시간 : {formatTime(V.times[0][0])} ~{' '}
            {formatTime(V.times[1][1])}
          </Text>
        </Box>
        <Box
          width={'20%'}
          alignItems="center"
          flexDirection="row"
          style={{ gap: 5 }}
        >
          <Text fontWeight="700">실력 : {V.level}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}

export default MercenaryCard
