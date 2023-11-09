import React, { useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import * as Kakao from '@react-native-seoul/kakao-login'
import useUserGlobalStore from '@/store/useUserGlobalStore'
import { userInfo } from '@/services/api'

const KakaoLogin = () => {
  const { user, updateUser } = useUserGlobalStore()
  const login = () => {
    Kakao.login()
      .then((result) => {
        getProfile()
      })
      .catch((error) => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message)
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message)
        }
      })
  }

  const getProfile = () => {
    Kakao.getProfile()
      .then(async (result) => {
        const res = await userInfo({
          id: result.id,
          name: result.nickname,
          thumb: result.thumbnailImageUrl,
        })
        console.log(res)
        updateUser({
          id: res.user.id,
          name: res.user.name,
          thumb: res.user.thumb,
          num: res.user.num,
          team: res.user.team,
          level: res.user.level,
        })
      })
      .catch((error) => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message)
      })
  }
  return (
    <TouchableOpacity onPress={() => login()}>
      <Image
        style={{
          marginTop: 50,
          width: 60,
          height: 60,
        }}
        source={require('@assets/images/kakao.png')}
      />
    </TouchableOpacity>
  )
}

export default KakaoLogin
