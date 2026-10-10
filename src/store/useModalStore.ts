import { create } from 'zustand';

interface ModalState {
  isAddTaskOpen: boolean;
  openAddTask: () => void;
  closeAddTask: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAddTaskOpen: false,
  openAddTask: () => set({ isAddTaskOpen: true }),
  closeAddTask: () => set({ isAddTaskOpen: false }),
}));
