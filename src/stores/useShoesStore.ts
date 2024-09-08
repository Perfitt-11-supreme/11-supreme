import { create } from 'zustand';

type ShoeStore = {
  selectedItem: number | null;
  setSelectedItem: (index: number | null) => void;
};

export const useShoesStore = create<ShoeStore>(set => ({
  selectedItem: null,
  setSelectedItem: index => set({ selectedItem: index }),
}));
