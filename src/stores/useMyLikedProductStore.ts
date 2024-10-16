import { create } from 'zustand';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { LIKED_COLLECTION, VIEWED_COLLECTION } from '../firebase/firebase';
import { TProduct } from '../types/product';

type MyLikedProductStore = {
  productsData: { [key: string]: TProduct };
  setProductsData: (products: { [key: string]: TProduct }) => void;
  addProduct: (uid: string, productId: string, product: TProduct) => Promise<void>;
  deleteProduct: (uid: string, productId: string) => Promise<void>;
  fetchProductsData: (userId: string) => Promise<void>;
  handleCardClick: (userId: string, productId: string) => Promise<void>;
  handleProductHeartChecked: (userId: string, productId: string, newChecked: boolean) => Promise<void>;
};

const useMyLikedProductStore = create<MyLikedProductStore>(set => ({
  productsData: {},
  setProductsData: products => set({ productsData: products }),

  addProduct: async (uid, productId, product) => {
    const timestamp = new Date().toISOString();
    if (!product) {
      throw new Error('Product가 null입니다.'); // product가 null인 경우 에러 처리
    }
    // Firestore에 제품 추가
    const userDoc = doc(LIKED_COLLECTION, uid);
    await updateDoc(userDoc, {
      [`products.${productId}`]: { ...product, isLiked: true, timestamp }, // isLiked 추가
    });

    set(state => ({
      productsData: {
        ...state.productsData,
        [productId]: { ...product, isLiked: true, timestamp }, // 상태에 추가 (uid와 timestamp 포함)
      },
    }));
  },

  deleteProduct: async (uid, productId) => {
    const userDoc = doc(LIKED_COLLECTION, uid);
    await updateDoc(userDoc, {
      [`products.${productId}`]: deleteField(),
    });

    set(state => {
      const updatedProducts = { ...state.productsData };
      delete updatedProducts[productId];
      return { productsData: updatedProducts };
    });
  },

  fetchProductsData: async userId => {
    const userDoc = doc(LIKED_COLLECTION, userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const productsData: { [key: string]: TProduct } = data?.products || {}; // 타입 명시

      set({ productsData });
    }
  },

  handleCardClick: async (userId, productId) => {
    const timestamp = new Date().toISOString();
    const viewedDocRef = doc(VIEWED_COLLECTION, userId);

    await updateDoc(viewedDocRef, {
      [`products.${productId}.timestamp`]: timestamp,
    });

    set(state => {
      const product = state.productsData[productId];
      if (!product) {
        return state;
      }

      return {
        productsData: {
          ...state.productsData,
          [productId]: {
            ...product,
            timestamp,
          },
        },
      };
    });
  },

  // 하트 상태를 변경하는 함수
  handleProductHeartChecked: async (userId, productId, newChecked) => {
    const likedDocRef = doc(LIKED_COLLECTION, userId);
    const timestamp = new Date().toISOString();

    await updateDoc(likedDocRef, {
      [`products.${productId}.isLiked`]: newChecked,
      [`products.${productId}.timestamp`]: timestamp,
    });

    set(state => {
      const product = state.productsData[productId];
      if (!product) {
        return state;
      }

      const updatedData = { ...state.productsData };

      if (!newChecked) {
        delete updatedData[productId]; // 좋아요 취소 시 상태에서 제거
      } else {
        updatedData[productId] = {
          ...product,
          isLiked: newChecked,
          timestamp,
        };
      }

      // 정렬: 최신순으로 productsData 정렬
      const sortedData = Object.entries(updatedData).sort(([, a], [, b]) => {
        const timestampA = a?.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timestampB = b?.timestamp ? new Date(b.timestamp).getTime() : 0;
        return timestampB - timestampA; // 최신순 정렬
      });

      // 정렬된 데이터를 다시 객체로 변환하여 상태에 저장
      const sortedProductsData = Object.fromEntries(sortedData);
      //   return { productsData: updatedData };
      return { productsData: sortedProductsData };
    });
  },
}));

export default useMyLikedProductStore;
