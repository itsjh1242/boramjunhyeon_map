import { create } from "zustand";

interface GlobalStore {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  globalLoading: false,
  setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),
}));
