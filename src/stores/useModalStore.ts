import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterOpen: boolean;
  setFilterOpen: (filterOpen: boolean) => void;
  fitOpen: boolean;
  setFitOpen: (fitOpen: boolean) => void;
  isKeywordModalOpen: boolean;
  setKeywordModalOpen: (isOpen: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (isShareModalOpen: boolean) => void;
  shareModalId: string | null;
  setShareModalId: (id: string | null) => void;
};

const useModalStore = create<ModalStore>(set => ({
  isOpen: false,
  setIsOpen: isOpen => set({ isOpen }),
  filterOpen: false,
  setFilterOpen: filterOpen => set({ filterOpen }),
  fitOpen: false,
  setFitOpen: fitOpen => set({ fitOpen }),
  isKeywordModalOpen: true,
  setKeywordModalOpen: isOpen => set({ isKeywordModalOpen: isOpen }),
  isShareModalOpen: false,
  setIsShareModalOpen: isShareModalOpen => set({ isShareModalOpen }),
  shareModalId: null,
  setShareModalId: id => set({ shareModalId: id }),
}));

export default useModalStore;
