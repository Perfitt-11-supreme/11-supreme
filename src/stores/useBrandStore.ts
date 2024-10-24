import { create } from 'zustand';
import { TBrand } from '../types/brand';



type BrandStoreState = {
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  brands: TBrand[] | null;
  setBrands: (brands: TBrand[]) => void;
};

const useBrandStore = create<BrandStoreState>((set) => ({
  selectedBrand: null as string | null, 
  setSelectedBrand: (brand: string | null) => set({ selectedBrand: brand }),
  brands: null,
  setBrands: (brands: TBrand[]) => set({ brands }),
}));

export default useBrandStore;