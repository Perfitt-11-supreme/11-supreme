import { create } from 'zustand';


type BrandStoreState = {
  selectedBrand: string | null;
  setSelectedBrand: (brand: string) => void;
}

const useBrandStore = create<BrandStoreState>((set) => ({
  selectedBrand: null,
  setSelectedBrand: (brand: string) => set({ selectedBrand: brand }), // 상태 업데이트
}));

export default useBrandStore;