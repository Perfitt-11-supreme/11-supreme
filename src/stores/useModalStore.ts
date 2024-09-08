import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterOpen: boolean;
  setFilterOpen: (filterOpen: boolean) => void;
  fitOpen: boolean;
  setFitOpen: (fitOpen: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  filterOpen: false,
  setFilterOpen: (filterOpen) => set({ filterOpen }),
  fitOpen: false,
  setFitOpen: (fitOpen) => set({ fitOpen })
}));

export default useModalStore;
