import { create } from 'zustand';
import { TProduct } from '../types/product';

export type ProductStoreState = {
  message: string;
  products: Array<TProduct>;
  selectedKeywords: string[];
  setMessage: (message: string) => void;
  setProducts: (products: ProductStoreState['products']) => void;
  setSelectedKeywords: (keywords: string[]) => void;
};

const useProductStore = create<ProductStoreState>(set => ({
  message: '',
  products: [],
  selectedKeywords: [],

  setMessage: message => set({ message }),
  setProducts: products => set({ products }),
  setSelectedKeywords: keywords => set({ selectedKeywords: keywords }),
}));

export default useProductStore;
