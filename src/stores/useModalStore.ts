import { create } from 'zustand';


type ModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default useModalStore;