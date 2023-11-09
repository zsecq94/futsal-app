import { Box, Theme } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const NavigateBack = () => {
  const navigation = useNavigation()
  const theme = useTheme<Theme>()
  const navigateBack = () => {
    navigation.goBack()
  }
  return (
    <Pressable onPress={navigateBack}>
      <Box
        bg="gray100"
        p="2"
        borderRadius="rounded-7xl"
        style={{
          backgroundColor: theme.colors.green700,
        }}
      >
        <Icon name="caret-back-sharp" size={20} color="white" />
      </Box>
    </Pressable>
  )
}

export default NavigateBack
