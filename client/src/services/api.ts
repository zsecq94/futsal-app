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
  todayTime,
}: any) => {
  try {
    const res = await axiosInstance.post("/matchs/sign", {
      team: userTeam,
      place: name,
      date: selectedDate,
      time: selectedTimes,
      level,
      todayTime,
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
    console.log("error in getFalseMatch");
    throw error;
  }
};

export const getTodayDate = async ({ id }: any) => {
  try {
    const res = await axiosInstance.post("./matchs/gettodaydate", {
      id,
    });
    return res.data;
  } catch (error) {
    console.log("error in getFalseMatch");
    throw error;
  }
};

export const getOnePlaceData = async ({ selectedDate, name }: any) => {
  try {
    const res = await axiosInstance.post("./matchs/getoneplace", {
      id: selectedDate,
      name,
    });
    return res.data;
  } catch (error) {
    console.log("error in getFalseMatch");
    throw error;
  }
};

export const createTeam = async (teamData: any) => {
  try {
    const res = await axiosInstance.post("./teams/create", {
      teamData,
    });

    return res.data;
  } catch (error) {
    console.log("error in createTeam");
    throw error;
  }
};

export const getAllTeam = async () => {
  try {
    const res = await axiosInstance.get("./teams/getallteam");
    return res.data;
  } catch (error) {
    console.log("error in getTeam");
    throw error;
  }
};
