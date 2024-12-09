import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!sessionStorage.getItem("isAuthenticated"),

  login: () => {
    sessionStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },

  logout: () => {
    sessionStorage.removeItem("isAuthenticated");
    set({ isAuthenticated: false });
  },
}));
