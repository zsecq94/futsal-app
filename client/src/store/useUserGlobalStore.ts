import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserGlobalStore {
  user: IAuthUser | null;
  updateUser: (user: IAuthUser) => void;
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
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useUserGlobalStore;
