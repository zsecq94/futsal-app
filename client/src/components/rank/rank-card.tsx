import theme, { Box, Text } from '@/utils/theme'
import React from 'react'

const RankCard = ({ team, idx }: any) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      p="3"
      style={{
        backgroundColor: idx % 2 === 0 ? theme.colors.gray200 : 'white',
      }}
    >
      <Text fontWeight="400" style={{ width: '13%', textAlign: 'center' }}>
        {idx + 1}
      </Text>
      <Text fontWeight="400" style={{ width: '32%', textAlign: 'center' }}>
        {team.name}
      </Text>
      <Text fontWeight="400" style={{ width: '10%', textAlign: 'center' }}>
        {team.win + team.draw + team.lose}
      </Text>
      <Text fontWeight="400" style={{ width: '10%', textAlign: 'center' }}>
        {team.win}
      </Text>
      <Text fontWeight="400" style={{ width: '10%', textAlign: 'center' }}>
        {team.draw}
      </Text>
      <Text fontWeight="400" style={{ width: '10%', textAlign: 'center' }}>
        {team.lose}
      </Text>
      <Text fontWeight="400" style={{ width: '13%', textAlign: 'center' }}>
        {team.score}
      </Text>
    </Box>
  )
}

export default RankCard
