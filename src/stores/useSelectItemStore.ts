import { create } from 'zustand';
import { TProduct } from '../types/product';
import { createJSONStorage, persist } from 'zustand/middleware';

type SelectItemStore = {
  isSelected: number | null;
  setIsSelected: (index: number | null) => void;
  selectProduct: TProduct | null;
  setSelectProduct: (selectProduct: TProduct | null) => void;
  selectComplet: boolean;
  setSelectComplet: (selectComplet: boolean) => void;
  resetItem: () => void;
};

const useSelectItemStore = create(
  persist<SelectItemStore>(
    set => ({
      isSelected: null,
      setIsSelected: isSelected => {
        set({ isSelected });
      },
      selectProduct: null,
      setSelectProduct: selectProduct => {
        set({ selectProduct });
      },
      selectComplet: false,
      setSelectComplet: selectComplet => {
        set({ selectComplet });
      },
      resetItem: () => {
        set({
          isSelected: null,
          selectProduct: null,
          selectComplet: false,
        });
      },
    }),
    {
      name: 'selectItemStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectItemStore;
