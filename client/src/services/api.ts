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
    console.log("error in userInfo", error);
    throw error;
  }
};

export const getAllTeam = async () => {
  try {
    const res = await axiosInstance.get("./teams/get-all-team");
    return res.data;
  } catch (error) {
    console.log("error in getTeam", error);
    throw error;
  }
};

export const createApplyTeamRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in createApplyTeamRequest", error);
    throw error;
  }
};

export const createTeamRequest = async (url: string, { arg }: { arg: any }) => {
  try {
    const res = await axiosInstance.post(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in createTeamRequest", error);
    throw error;
  }
};

export const userTeamUpdateRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in userTeamUpdateRequest", error);
    throw error;
  }
};

export const applyTeamUpdateRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in applyTeamUpdateRequest", error);
    throw error;
  }
};

export const deleteUserTeamRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in deleteUserTeamRequest", error);
    throw error;
  }
};

export const updateTeamManagerRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in updateTeamManagerRequest", error);
    throw error;
  }
};

export const deleteTeamManagerRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in deleteTeamManagerRequest", error);
    throw error;
  }
};

export const changeTeamLeaderRequest = async (
  url: string,
  { arg }: { arg: any }
) => {
  try {
    const res = await axiosInstance.put(url, {
      ...arg,
    });
    return res.data;
  } catch (error) {
    console.log("error in deleteTeamManagerRequest", error);
    throw error;
  }
};
