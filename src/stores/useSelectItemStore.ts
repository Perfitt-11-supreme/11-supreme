import { create } from 'zustand';
import { TProduct } from '../types/product';

type SelectItemStore = {
  isSelected: number | null;
  setIsSelected: (index: number | null) => void;
  selectProduct: TProduct | null;
  setSelectProduct: (selectProduct: TProduct | null) => void;
  selectComplet: boolean;
  setSelectComplet: (selectComplet: boolean) => void;
};

const useSelectItemStore = create<SelectItemStore>(set => ({
  isSelected: null,
  setIsSelected: isSelected => set({ isSelected }),
  selectProduct: null,
  setSelectProduct: selectProduct => set({ selectProduct }),
  selectComplet: false,
  setSelectComplet: selectComplet => set({ selectComplet }),
}));

export default useSelectItemStore;
