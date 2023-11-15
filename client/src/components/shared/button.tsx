import theme, { Box, Text } from '@/utils/theme'
import React from 'react'
import { TouchableOpacity } from 'react-native'

type ButtonProps = {
  label: string
  onPress: () => void
}

const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 16,
        alignItems: 'center',
        backgroundColor: theme.colors.green600,
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
        variant="text2Xl"
        fontWeight="700"
        style={{
          color: 'white',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Button
