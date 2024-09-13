import { create } from 'zustand';
import { TProduct } from '../types/product';

type SelectItemStore = {
  isSelected: number | null;
  setIsSelected: (index: number) => void;
  selectProduct: TProduct | null;
  setSelectProduct: (selectProduct: TProduct) => void;
};

const useSelectItemStore = create<SelectItemStore>(set => ({
  isSelected: null,
  setIsSelected: isSelected => set({ isSelected }),
  selectProduct: null,
  setSelectProduct: selectProduct => set({ selectProduct }),
}));

export default useSelectItemStore;
