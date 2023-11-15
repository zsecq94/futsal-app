import React from 'react'
import theme, { Box, Text } from '@/utils/theme'
import { TouchableOpacity } from 'react-native'

const TeamOutModal = ({ user, teamData, outTeam, toggleModal }: any) => {
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
        }}
      >
        {user.name === teamData.leader ? (
          <>
            <Text
              variant="textBase"
              fontWeight="700"
              style={{ textAlign: 'center' }}
            >
              팀장은 팀을 탈퇴할 수 없습니다...
            </Text>
            <Text
              variant="textSm"
              fontWeight="700"
              style={{ textAlign: 'center' }}
            >
              팀장을 다른 팀원에게 넘겨주세요!
            </Text>
            <Box height={30} />
            <TouchableOpacity onPress={toggleModal}>
              <Text
                p="2"
                mx="10"
                style={{
                  backgroundColor: theme.colors.green600,
                  borderRadius: 5,
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                확인
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text
              variant="textBase"
              fontWeight="700"
              style={{ textAlign: 'center' }}
            >
              정말로 팀을 탈퇴하시겠습니까?
            </Text>
            <Box height={30} />
            <Box
              flexDirection="row"
              mx="10"
              style={{ gap: 50 }}
              justifyContent="center"
            >
              <TouchableOpacity
                onPress={() => {
                  outTeam({ state: true })
                }}
              >
                <Text
                  p="2"
                  style={{
                    backgroundColor: 'red',
                    borderRadius: 5,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  네
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text
                  p="2"
                  style={{
                    backgroundColor: theme.colors.green600,
                    borderRadius: 5,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  아니요
                </Text>
              </TouchableOpacity>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default TeamOutModal
