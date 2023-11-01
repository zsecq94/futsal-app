import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserGlobalStore {
  user: IAuthUser | null;
  updateUser: (user: IAuthUser) => void;
  logoutUser: () => void;
}

const useUserGlobalStore = create<IUserGlobalStore>()(
  persist(
    (set, get) => ({
      user: null,
      updateUser: (user) => {
        set({
          user,
        });
      },
      logoutUser: async () => {
        await AsyncStorage.removeItem("user-store");
        set({
          user: null,
        });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserGlobalStore;
