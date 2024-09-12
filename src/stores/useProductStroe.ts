import { create } from 'zustand';
import { ProductData } from '../types/data';

type ProductsData = {
  data: ProductData[] | null;
  setData: (data: Partial<ProductsData>) => void;
};

const useProductStore = create<ProductsData>(set => ({
  data: null,
  setData: getData => set(state => ({ ...state, ...getData })),
}));

export default useProductStore;
