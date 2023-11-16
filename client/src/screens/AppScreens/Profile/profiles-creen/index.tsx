import Button from '@/components/shared/button'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { Box } from '@/utils/theme'
import React from 'react'

const ProfileScreen = () => {
  const { logoutUser } = useUserGlobalStore()

  const logout = () => {
    logoutUser()
  }

  return (
    <Box>
      <Button label="로그아웃" onPress={logout} />
    </Box>
  )
}

export default ProfileScreen
