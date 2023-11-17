import HrTag from '@/components/shared/hrtag'
import Loader from '@/components/shared/loader'
import Apply from '@/components/team/apply'
import ApplyCard from '@/components/team/applycard'
import TeamModal from '@/components/team/team-modal'
import { SocketContext } from '@/context/SocketContext'
import { applyTeamUpdateRequest, userTeamUpdateRequest } from '@/services/api'
import { fetcher } from '@/services/config'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import theme, { Box, Text } from '@/utils/theme'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const TeamInfoScreen = () => {
  const todayDate = moment().format('YYYY-MM-DD')
  const { user, updateUser } = useUserGlobalStore()
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<any>()

  const socket = useContext(SocketContext)
  const modalAnimatedValue = useState(new Animated.Value(1))[0]

  const [memberListModal, setMemberListModal] = useState(false)

  const {
    data: teamData,
    isLoading: teamDataIsLoading,
    mutate: teamDataMutate,
  } = useSWR(`teams/get-team/${user?.team}`, fetcher)

  const {
    data: teamMatchData,
    isLoading: teamMatchDataIsLoading,
    mutate: teamMatchDataMutate,
  } = useSWR(
    `matchs/get-team-match-data/${teamData?.name}/${todayDate}`,
    fetcher,
  )

  console.log(teamMatchData)

  const {
    data: teamMember,
    isLoading: teamMemberIsLoading,
    mutate: teamMemberMutate,
  } = useSWR(`users/get-member/${teamData?.name}`, fetcher)

  const { trigger: userTeamUpdate } = useSWRMutation(
    `users/update`,
    userTeamUpdateRequest,
  )

  const { trigger: applyTeamUpdate } = useSWRMutation(
    `teams/update-team-apply`,
    applyTeamUpdateRequest,
  )

  useEffect(() => {
    teamDataMutate()
    teamMemberMutate()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on(`${user?.name}-apply-update`, async () => {
        try {
          await teamDataMutate()
          await teamMemberMutate()
          setLoading(false)
        } catch (error) {
          throw error
        }
      })
      socket.on(`${user?.id}-delete`, (newUser: IAuthUser) => {
        Toast.show({
          type: 'error',
          text1: '팀에서 추방되었습니다...',
          visibilityTime: 2000,
        })
        navigation.navigate('Team')
        updateUser(newUser)
      })
      socket.on(`${teamData?.name}-update`, async () => {
        await teamMemberMutate()
      })
      socket.on(`${teamData?.name}-manager`, async () => {
        await teamDataMutate()
        await teamMemberMutate()
      })
      socket.on(`${teamData?.name}-match-data-update`, async () => {
        await teamMatchDataMutate()
      })
    }

    return () => {
      if (socket) {
        socket.off(`${user?.id}-delete`)
        socket.off(`${teamData?.name}-manager`)
        socket.off(`${user?.id}-apply-update`)
        socket.off(`${teamData?.name}-update`)
        socket.off(`${teamData?.name}-match-data-update`)
      }
    }
  }, [socket, user, teamData])

  const handleApply = async ({ state, id }: any) => {
    try {
      if (state) {
        setLoading(true)
        const res = await userTeamUpdate({ id, teamData: teamData.name })
        await applyTeamUpdate({
          user: id,
          team: teamData,
          state: false,
          count: true,
        })
        if (res.state) {
          Toast.show({
            type: 'success',
            text1: res.message,
            visibilityTime: 2000,
          })
        } else {
          Toast.show({
            type: 'error',
            text1: res.message,
            visibilityTime: 2000,
          })
        }
      } else {
        setLoading(true)
        await applyTeamUpdate({
          user: id,
          team: teamData,
          state: false,
          count: false,
        })
      }
    } catch (error) {
      console.log('error in handleApply', error)
      throw error
    }
  }

  const handleModal = () => {
    setMemberListModal(true)
    Animated.timing(modalAnimatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  if (!teamData || teamDataIsLoading || loading || teamMemberIsLoading) {
    return <Loader />
  }

  const managerCheck =
    teamData?.manager?.includes(user?.id) || teamData.leader === user?.name

  return (
    <Box>
      <Box justifyContent="space-between" flexDirection="row" px="5" mt="5">
        <Text
          variant="text2Xl"
          fontWeight="700"
          style={{
            textAlign: 'center',
            color: theme.colors.green600,
          }}
        >
          {teamData.name}
        </Text>
        <TouchableOpacity
          onPress={handleModal}
          style={{
            backgroundColor: theme.colors.green600,
            borderRadius: 10,
          }}
        >
          <Text
            p="1"
            variant="textBase"
            fontWeight="700"
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            {managerCheck ? '팀원관리' : '팀원보기'}
          </Text>
        </TouchableOpacity>
      </Box>
      <HrTag />
      <Box mx="5">
        <Text>Hi</Text>
      </Box>
      {managerCheck && <Apply teamData={teamData} handleApply={handleApply} />}
      <TeamModal
        teamData={teamData}
        teamMember={teamMember}
        memberListModal={memberListModal}
        setMemberListModal={setMemberListModal}
        setLoading={setLoading}
        modalAnimatedValue={modalAnimatedValue}
      />
    </Box>
  )
}

export default TeamInfoScreen
