import create from 'zustand';

interface ShoesStore {
  selectedItem: number | null;
  setSelectedItem: (item: number | null) => void;
}

export const useShoesStore = create<ShoesStore>(set => ({
  selectedItem: null,
  setSelectedItem: item => set({ selectedItem: item }),
}));
