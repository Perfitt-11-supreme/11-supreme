import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterOpen: boolean;
  setFilterOpen: (filterOpen: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  filterOpen: false,
  setFilterOpen: (filterOpen) => set({ filterOpen }),
}));

export default useModalStore;
