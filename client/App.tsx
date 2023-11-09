import SafeAreaWrapper from '@/components/shared/safe-area-wrapper'
import { SocketContext, getSocket } from '@/context/SocketContext'
import Navigation from '@/navigation'
import theme, { Box, Text } from '@/utils/theme'
import { ThemeProvider } from '@shopify/restyle'
import React from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

const App = () => {
  const socketInstance = getSocket()
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaWrapper>
          <SocketContext.Provider value={socketInstance}>
            <Navigation />
          </SocketContext.Provider>
        </SafeAreaWrapper>
      </SafeAreaProvider>
      <Toast />
    </ThemeProvider>
  )
}
export default App
