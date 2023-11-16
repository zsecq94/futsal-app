import RankCard from '@/components/rank/rank-card'
import { SocketContext } from '@/context/SocketContext'
import { fetcher } from '@/services/config'
import theme, { Box, Text } from '@/utils/theme'
import React, { useContext, useEffect, useState } from 'react'
import useSWR from 'swr'

const RankingScreen = () => {
  const socket = useContext(SocketContext)
  const [sortedTeams, setSortedTeams] = useState([])
  const {
    data: allTeams,
    isLoading,
    mutate: allTeamsMutate,
  } = useSWR('teams/get-all-team', fetcher)

  useEffect(() => {
    allTeamsMutate()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('team-list-update', async () => {
        await allTeamsMutate()
      })
    }
    return () => {
      if (socket) {
        socket.off('team-list-update')
      }
    }
  }, [socket])

  useEffect(() => {
    if (allTeams) {
      const teams: any = [...allTeams]
      teams.sort((a, b) => b.score - a.score)
      setSortedTeams(teams)
    }
  }, [allTeams])

  console.log(sortedTeams)

  return (
    <Box>
      <Text
        textAlign="center"
        variant="text2Xl"
        p="4"
        fontWeight="700"
        style={{
          borderBottomWidth: 2,
          borderBottomColor: theme.colors.green600,
          color: theme.colors.green600,
        }}
      >
        빛가람 풋살장 랭킹
      </Text>
      <Text
        textAlign="center"
        p="2"
        fontWeight="700"
        style={{
          color: 'grey',
        }}
      >
        랭킹은 6개월마다 초기화 됩니다...
      </Text>
      <Box flexDirection="row" justifyContent="space-between" p="3">
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          순위
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          팀명
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          경기 수
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          승
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          무
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          패
        </Text>
        <Text fontWeight="700" style={{ width: '14%', textAlign: 'center' }}>
          점수
        </Text>
      </Box>
      {sortedTeams?.map((team, idx) => {
        return <RankCard key={idx} team={team} idx={idx} />
      })}
    </Box>
  )
}

export default RankingScreen
