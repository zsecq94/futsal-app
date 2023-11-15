import { fetcher } from '@/services/config'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import theme, { Box, Text } from '@/utils/theme'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import useSWR from 'swr'
import Loader from '../shared/loader'
import useSWRMutation from 'swr/mutation'
import { updateMatchStateRequest } from '@/services/api'
import Toast from 'react-native-toast-message'

const MatchModal = ({ toggleModal, oneData }: any) => {
  const { user } = useUserGlobalStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    data: teamData,
    isLoading: teamDataIsLoading,
    mutate: teamDataMutate,
  } = useSWR(`teams/get-team/${user?.team}`, fetcher)

  const { trigger: updateMatchState } = useSWRMutation(
    `matchs/update-match-state`,
    updateMatchStateRequest,
  )

  const handleMatch = async () => {
    setIsLoading(true)
    const res = await updateMatchState({
      id: oneData._id,
      team2: user?.team,
    })
    if (res.state) {
      Toast.show({
        type: 'success',
        text1: res.message,
      })
    } else {
      Toast.show({
        type: 'error',
        text1: res.message,
      })
    }
    setIsLoading(false)
    toggleModal()
  }

  if (!teamData || teamDataIsLoading || isLoading) {
    return <Loader />
  }

  const isMatchable =
    user?.team !== oneData?.team1 &&
    (teamData?.manager?.includes(user?.id) || teamData.leader === user?.name)

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <Box
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={toggleModal}>
          <Text
            p="2"
            variant="textBase"
            fontWeight="700"
            style={{
              color: 'white',
              backgroundColor: theme.colors.green600,
              textAlign: 'center',
            }}
          >
            뒤로가기
          </Text>
        </TouchableOpacity>
        {isMatchable && (
          <TouchableOpacity onPress={handleMatch}>
            <Text
              p="2"
              variant="textBase"
              fontWeight="700"
              style={{
                color: 'white',
                backgroundColor: theme.colors.green600,
                textAlign: 'center',
              }}
            >
              매칭
            </Text>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  )
}

export default MatchModal
