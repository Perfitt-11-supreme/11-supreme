import { create } from 'zustand';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { VIEWED_COLLECTION } from '../firebase/firebase';
import { TProduct } from '../types/product';

type MyViewedProductStore = {
  productsData: { [key: string]: TProduct };
  setProductsData: (products: { [key: string]: TProduct }) => void;
  fetchProductsViewedData: (userId: string) => Promise<void>;
  handleCardClick: (userId: string, productId: string, product: TProduct) => Promise<void>;
};

const useMyViewedProductStore = create<MyViewedProductStore>(set => ({
  productsData: {},
  setProductsData: products => set({ productsData: products }),

  // Firestore에서 myViewed 데이터를 가져오는 함수
  fetchProductsViewedData: async userId => {
    const userDoc = doc(VIEWED_COLLECTION, userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const productsData: { [key: string]: TProduct } = data?.products || {}; // Firestore에서 데이터 가져옴

      // 정렬: 최신순으로 productsData 정렬
      const sortedData = Object.entries(productsData).sort(([, a], [, b]) => {
        const timestampA = a?.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timestampB = b?.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timestampB - timestampA; // 최신순 정렬
      });

      // 정렬된 데이터를 다시 객체로 변환하여 상태에 저장
      const sortedProductsData = Object.fromEntries(sortedData);
      set({ productsData: sortedProductsData }); // 상태에 저장
    } else {
      console.log('No data found for this user.');
    }
  },

  // 카드 클릭 시 timestamp 업데이트
  handleCardClick: async (userId: string, productId: string, product: TProduct) => {
    if (!product) {
      console.error('Product is null or undefined');
      return; // product가 null인 경우 함수 종료
    }

    const timestamp = new Date().toISOString();
    const viewedDocRef = doc(VIEWED_COLLECTION, userId);

    // Firestore에서 제품 전체 정보를 업데이트 (timestamp와 함께)
    await updateDoc(viewedDocRef, {
      [`products.${productId}`]: { ...product, timestamp }, // product 전체 정보와 timestamp 저장
    });

    // Zustand에서 상태 업데이트
    set(state => {
      const updatedProduct: TProduct = { ...product, timestamp }; // TProduct 타입과 일치

      return {
        productsData: {
          ...state.productsData,
          [productId]: updatedProduct, // 상태 업데이트
        },
      };
    });
  },
}));

export default useMyViewedProductStore;
