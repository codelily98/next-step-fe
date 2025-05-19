import { create } from "zustand";

type UIStore = {
    isLoading: boolean;
    setLoading: (state: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
    isLoading: false,
    setLoading: (state) => set({ isLoading: state }),
}));
