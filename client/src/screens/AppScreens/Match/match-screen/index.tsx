import MatchCategory from '@/components/match/matchcategory'
import { Box } from '@/utils/theme'
import React, { useEffect, useState } from 'react'
import MatchMatchingScreen from '../match-matching-screen'
import MatchMercenaryScreen from '../match-mercenary-screen'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { axiosInstance } from '@/services/config'

const MatchScreen = () => {
  const { user, updateUser } = useUserGlobalStore()
  const [check, setCheck] = useState(0)

  const data = ['매칭 / 예약', '용병']

  const getNewUser = async () => {
    const newUser = await axiosInstance.get(`users/get-user/${user?.id}`)
    updateUser(newUser.data)
  }

  useEffect(() => {
    if (user) {
      getNewUser()
    }
  }, [])

  return (
    <Box>
      <Box flexDirection="row">
        {data.map((label, index) => (
          <MatchCategory
            label={label}
            check={check}
            num={index}
            setCheck={setCheck}
            key={index}
          />
        ))}
      </Box>
      {check === 0 && <MatchMatchingScreen />}
      {check === 1 && <MatchMercenaryScreen />}
    </Box>
  )
}

export default MatchScreen
