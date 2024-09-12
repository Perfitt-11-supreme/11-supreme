import { create } from 'zustand';
import { TBrand } from '../types/brand';



type BrandStoreState = {
  selectedBrand: string | null;
  setSelectedBrand: (brand: string) => void;
  brands: TBrand[] | null;
  setBrands: (brands: TBrand[]) => void;
};

const useBrandStore = create<BrandStoreState>((set) => ({
  selectedBrand: null,
  setSelectedBrand: (brand: string) => set({ selectedBrand: brand }),
  brands: null,
  setBrands: (brands: TBrand[]) => set({ brands }),
}));

export default useBrandStore;