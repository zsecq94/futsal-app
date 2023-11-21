import axios from 'axios'

// export const BASE_URL = "http://10.0.2.2:1337/";
export const BASE_URL = 'http://192.168.219.101:3000/'
// export const BASE_URL =
//   'https://port-0-fsapp-server-5mk12alp2zq8ng.sel5.cloudtype.app/'

export const REST_API_KEY = '1ff96c0aa43f9b0c4db00ccaf3e6da4b'
export const REDIRECT_URI = 'https://auth.expo.io/@zsecq94/client'

const TIME_OUT = 30000

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)
