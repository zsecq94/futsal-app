import theme, { Box, Text } from '@/utils/theme'
import React from 'react'
import HrTag from '../shared/hrtag'
import ApplyCard from './applycard'

const Apply = ({ teamData, handleApply }: any) => {
  return (
    <Box>
      <Text
        variant="textXl"
        fontWeight="700"
        style={{
          textAlign: 'center',
          color: theme.colors.green600,
        }}
      >
        팀 신청 목록
      </Text>
      <HrTag />
      <Box alignItems="center" style={{ gap: 10 }}>
        {teamData?.apply.map((user: any, idx: number) => {
          return <ApplyCard key={idx} onPress={handleApply} user={user} />
        })}
      </Box>
    </Box>
  )
}

export default Apply
