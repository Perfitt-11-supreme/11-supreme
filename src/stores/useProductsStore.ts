import { create } from 'zustand';

 type ProductStoreState = {
  message: string;
  products: Array<{
    brand: string;
    image: string;
    link: string;
    modelName: string;
    modelNo: string;
    productId: string;
  }>;
  selectedKeywords: string[];
  setMessage: (message: string) => void;
  setProducts: (products: ProductStoreState['products']) => void;
  setSelectedKeywords: (keywords: string[]) => void;
};

// Zustand Store 생성
const useProductStore = create<ProductStoreState>((set) => ({
  message: '',
  products: [],
  selectedKeywords: [],

  setMessage: (message) => set({ message }),
  setProducts: (products) => set({ products }),
  setSelectedKeywords: (keywords) => set({ selectedKeywords: keywords }),
}));

export default useProductStore;