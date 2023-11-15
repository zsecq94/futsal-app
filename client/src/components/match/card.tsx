import { Box, Text } from '@/utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import CardCategory from './cardcategory'
import TimePickerPreview from './timepicker-preview'

const Card = ({ data, idx, onPress }: any) => {
  const name = idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'

  return (
    <TouchableOpacity
      onPress={() => onPress({ name })}
      style={{
        alignItems: 'center',
      }}
    >
      <Box
        mt="2"
        py="2"
        px="5"
        justifyContent="space-between"
        style={{
          width: '90%',
          height: 100,
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
        <Box flexDirection="row" justifyContent="space-between">
          <Text variant="textBase">{name} 구장</Text>
          <Text variant="textBase">{data.count ? data.count : 0} 경기</Text>
        </Box>
        <Box
          flexDirection="row"
          style={{
            gap: 10,
          }}
        >
          <CardCategory V={name} />
        </Box>
        <Box height={5} />
        <TimePickerPreview data={data.times} />
      </Box>
    </TouchableOpacity>
  )
}

export default Card
