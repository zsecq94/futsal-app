import theme, { Box, Text } from '@/utils/theme'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'

const TeamMemberDetail = ({
  changeTeamLeader,
  memberDetail,
  toggleDetailModal,
  user,
  teamData,
  deleteUserTeam,
  setMemberListModal,
  updateTeamManager,
  deleteTeamManager,
}: any) => {
  const handleUpdateTeamManager = async () => {
    toggleDetailModal()
    setMemberListModal(false)
    const res = await updateTeamManager({
      id: memberDetail.id,
      teamName: teamData.name,
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
  }

  const handleDeleteTeamManager = async () => {
    toggleDetailModal()
    setMemberListModal(false)
    const res = await deleteTeamManager({
      id: memberDetail.id,
      teamName: teamData.name,
    })
    Toast.show({
      type: 'success',
      text1: res.message,
      visibilityTime: 2000,
    })
  }

  const handleDeleteUserTeam = async () => {
    toggleDetailModal()
    setMemberListModal(false)
    const res = await deleteUserTeam({
      id: memberDetail?.id,
      teamData,
    })
    if (res) {
      return Toast.show({
        type: 'success',
        text1: '추방 성공!',
        visibilityTime: 2000,
      })
    }
  }

  const handleChangeTeamLeader = async () => {
    toggleDetailModal()
    setMemberListModal(false)
    const res = await changeTeamLeader({
      name: memberDetail?.name,
      teamName: teamData.name,
    })
    if (res) {
      return Toast.show({
        type: 'success',
        text1: res.message,
        visibilityTime: 2000,
      })
    }
  }

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
        <TouchableOpacity onPress={toggleDetailModal}>
          <Text
            p="1"
            fontWeight="700"
            style={{
              backgroundColor: theme.colors.green600,
              color: 'white',
              borderRadius: 5,
            }}
          >
            뒤로가기
          </Text>
        </TouchableOpacity>
        <Image
          source={{ uri: memberDetail.thumb }}
          width={100}
          height={100}
          style={{
            borderRadius: 50,
          }}
        />
        <Text variant="textBase" fontWeight="700">
          {memberDetail.name}
        </Text>
        {user._id !== memberDetail._id && (
          <TouchableOpacity onPress={toggleDetailModal}>
            <Text
              p="2"
              style={{
                backgroundColor: theme.colors.yellow400,
                borderRadius: 5,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              메시지 보내기
            </Text>
          </TouchableOpacity>
        )}
        <Box flexDirection="row" style={{ gap: 10 }}>
          {teamData.leader === user.name &&
          teamData.manager.includes(memberDetail.id)
            ? user._id !== memberDetail._id && (
                <TouchableOpacity onPress={handleDeleteTeamManager}>
                  <Text
                    p="2"
                    style={{
                      backgroundColor: theme.colors.red500,
                      borderRadius: 5,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    권한 제거
                  </Text>
                </TouchableOpacity>
              )
            : user.name === teamData.leader &&
              user._id !== memberDetail._id && (
                <TouchableOpacity onPress={handleUpdateTeamManager}>
                  <Text
                    p="2"
                    style={{
                      backgroundColor: theme.colors.blue400,
                      borderRadius: 5,
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    매칭 권한
                  </Text>
                </TouchableOpacity>
              )}
          {user.name === teamData.leader && user._id !== memberDetail._id && (
            <TouchableOpacity onPress={handleChangeTeamLeader}>
              <Text
                p="2"
                style={{
                  backgroundColor: theme.colors.blue400,
                  borderRadius: 5,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                팀장 넘기기
              </Text>
            </TouchableOpacity>
          )}
          {user.name === teamData.leader && user._id !== memberDetail._id && (
            <TouchableOpacity onPress={handleDeleteUserTeam}>
              <Text
                p="2"
                style={{
                  backgroundColor: theme.colors.red500,
                  borderRadius: 5,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                추방 하기
              </Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default TeamMemberDetail
