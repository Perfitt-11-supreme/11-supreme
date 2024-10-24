import { create } from 'zustand';
import { TProduct } from '../types/product';

type ProductDetailStore = {
  showBridgePage: boolean;
  selectedProductLink: string;
  selectedProduct: TProduct | null;
  setShowBridgePage: (show: boolean) => void;
  setSelectedProductLink: (link: string) => void;
  handleProductDetailsClick: (product: TProduct) => void;
};

const useProductDetailStore = create<ProductDetailStore>((set) => ({
  showBridgePage: false,
  selectedProductLink: '',
  selectedProduct:null,
  setShowBridgePage: (show) => set({ showBridgePage: show }),
  setSelectedProductLink: (link) => set({ selectedProductLink: link }),
  handleProductDetailsClick: (product) => {
    if (product?.link) {
      set({ 
        selectedProductLink: product.link, 
        showBridgePage: true,
        selectedProduct:product
      });
    }
  },
}));

export default useProductDetailStore;