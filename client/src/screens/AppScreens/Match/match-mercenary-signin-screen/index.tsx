import theme, { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const MatchMervenarySignInScreen = () => {
  const [category, setCategory] = useState(0)
  return (
    <Box flex={1}>
      <Box flexDirection="row" alignItems="center">
        <TouchableOpacity
          onPress={() => setCategory(0)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: category === 0 ? 3 : 0,
            borderBottomColor: category === 0 ? theme.colors.green700 : 'black',
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{
              color: category === 0 ? theme.colors.green700 : 'black',
            }}
          >
            용병 신청
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCategory(1)}
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: category === 1 ? 3 : 0,
            borderBottomColor: category === 1 ? theme.colors.green700 : 'black',
          }}
        >
          <Text
            variant="textLg"
            fontWeight="700"
            p="3"
            style={{ color: category === 1 ? theme.colors.green700 : 'black' }}
          >
            용병 모집
          </Text>
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          justifyContent: 'center',
          backgroundColor: theme.colors.green700,
        }}
      >
        <Text
          p="5"
          fontWeight="700"
          variant="textLg"
          style={{ textAlign: 'center', color: 'white' }}
        >
          신청하기
        </Text>
      </TouchableOpacity>
    </Box>
  )
}

export default MatchMervenarySignInScreen
