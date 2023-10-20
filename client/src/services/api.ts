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
  }
};
