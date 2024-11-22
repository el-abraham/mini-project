import { create } from "zustand";

type State = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  toggle: () => void;
};

export const useSidebarStore = create<State>((set) => ({
  isOpen: false,
  onOpenChange: (isOpen: boolean) => set({ isOpen }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
