import theme, { Text } from '@/utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'

type MatchCategoryProps = {
  label: string
  check: number
  num: number
  setCheck: React.Dispatch<React.SetStateAction<number>>
}

const MatchCategory = ({ label, setCheck, check, num }: MatchCategoryProps) => {
  return (
    <TouchableOpacity
      onPress={() => setCheck(num)}
      style={{
        width: '50%',
        backgroundColor: check === num ? 'transparent' : theme.colors.gray300,
      }}
    >
      <Text
        variant="textLg"
        fontWeight="700"
        p="3"
        style={{
          textAlign: 'center',
          color: check === num ? theme.colors.green600 : 'grey',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default MatchCategory
