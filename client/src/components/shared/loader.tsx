import { Box } from '@/utils/theme'
import React from 'react'
import { ActivityIndicator } from 'react-native'

const Loader = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator size="large" color="#00ff00" />
    </Box>
  )
}

export default Loader
