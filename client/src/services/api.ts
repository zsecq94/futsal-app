import moment from "moment";
import { axiosInstance } from "./config";

export const userInfo = async ({ id, name, thumb }: any) => {
  try {
    const res = await axiosInstance.post("/users/auth", {
      id,
      name,
      thumb,
    });

    return res.data;
  } catch (error) {
    console.log("error in userInfo");
    throw error;
  }
};

export const matchSign = async ({
  userTeam,
  name,
  level,
  selectedDate,
  selectedTimes,
}: any) => {
  try {
    const res = await axiosInstance.post("/matchs/sign", {
      team: userTeam,
      place: name,
      date: selectedDate,
      time: selectedTimes,
      level,
    });

    return res.data;
  } catch (error) {
    console.log("error in userInfo");
    throw error;
  }
};

export const getFalseMatch = async () => {
  try {
    const res = await axiosInstance.get("./matchs/getfalsematch");
    return res.data;
  } catch (error) {
    console.log("error in getFalseMatch(CLIENT)");
    throw error;
  }
};

export const getDateAndCount = async () => {
  const todayDate = moment().format("YYYY-MM-DD");
  try {
    const res = await axiosInstance.post("./matchs/getdate", {
      todayDate,
    });
    return res.data;
  } catch (error) {
    console.log("error in getFalseMatch(CLIENT)");
    throw error;
  }
};
