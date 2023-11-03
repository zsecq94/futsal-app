import axios from "axios";

// export const BASE_URL = "http://10.0.2.2:1337/";
export const BASE_URL = "http://192.168.219.101:1337/";
export const REST_API_KEY = "1ff96c0aa43f9b0c4db00ccaf3e6da4b";
export const REDIRECT_URI = "http://192.168.219.101:19006/Home";
const TIME_OUT = 30000;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
