import { create } from 'zustand';
import { ModalStore } from '../types/modal';

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: '',
  content: '',
  callbackButton: {},
  openModal: (state) => set((prevState) => ({ ...prevState, ...state, isOpen: true })),
  closeModal: () => set({ isOpen: false }),
}));

export default useModalStore;