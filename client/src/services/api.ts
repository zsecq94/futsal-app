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

export const getFalseMatch = async () => {
  try {
    const res = await axiosInstance.get("./matchs/getfalsematch");
    return res.data;
  } catch (error) {
    console.log("error in getFalseMatch", error);
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
    console.log("error in getFalseMatch", error);
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
    console.log("error in getFalseMatch", error);
    throw error;
  }
};

export const createTeam = async ({ teamData, user }: any) => {
  try {
    const res = await axiosInstance.post("./teams/create", {
      teamData,
      leader: user.name,
    });

    if (res.data.state) {
      const ress = await axiosInstance.put("./users/update", {
        id: user.id,
        teamData,
      });
      return { res1: res.data, res2: ress.data };
    } else {
      return { res1: res.data };
    }
  } catch (error) {
    console.log("error in createTeam", error);
    throw error;
  }
};

export const getAllTeam = async () => {
  try {
    const res = await axiosInstance.get("./teams/getallteam");
    return res.data;
  } catch (error) {
    console.log("error in getTeam", error);
    throw error;
  }
};

export const createApplyTeam = async ({ user, team }: any) => {
  try {
    const res = await axiosInstance.post("./teams/createteamdata", {
      user,
      team,
    });
    return res.data;
  } catch (error) {
    console.log("error in applyTeam", error);
    throw error;
  }
};

export const getApplyData = async ({ name }: any) => {
  try {
    const res = await axiosInstance.post("./teams/getapplydata", { name });
    return res.data;
  } catch (error) {
    console.log("error in getApplyData", error);
    throw error;
  }
};

export const getApplyUser = async ({ id }: any) => {
  try {
    const res = await axiosInstance.post("./users/getapplyuser", { id });
    return res.data;
  } catch (error) {
    console.log("error in getApplyData", error);
    throw error;
  }
};

export const userTeamUpdate = async ({ id, team }: any) => {
  try {
    const res = await axiosInstance.put("./users/teamupdate", { id, team });
    if (res.data.state) {
      const res2 = await axiosInstance.put("./teams/updataapply", { id, team });

      if (res2.data.state) {
        return res.data;
      }
    } else {
      return res.data;
    }
  } catch (error) {
    console.log("error in userTeamUpdate", error);
    throw error;
  }
};
