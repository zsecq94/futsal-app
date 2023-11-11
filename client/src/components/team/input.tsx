import theme, { Box } from '@/utils/theme'
import React from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const Input = ({
  focusCheck,
  setSearchTeam,
  resetSelectedFilter,
  inputRef,
  searchTeam,
}: any) => {
  return (
    <Box
      mr="5"
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '35%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingRight: 3,
        backgroundColor: !focusCheck ? theme.colors.gray200 : 'white',
      }}
    >
      <TextInput
        value={searchTeam}
        ref={inputRef}
        onFocus={resetSelectedFilter}
        onChangeText={setSearchTeam}
        placeholder="팀 검색..."
        placeholderTextColor="grey"
        style={{
          flex: 1,
          marginLeft: 10,
        }}
      />
      <Icon name="search-sharp" size={25} color={'grey'} />
    </Box>
  )
}

export default Input
