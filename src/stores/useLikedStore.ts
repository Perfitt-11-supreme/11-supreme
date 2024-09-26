import create from 'zustand';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useUserStore from './useUserStore';

type Product = {
  brand?: string;
  image: string;
  link: string;
  modelName: string;
  price: number;
  sizeRecommend: string;
  productId?: string;
  uid: string;
  timestamp?: string; // 클릭한 시간을 기록하는 필드
};

type Brand = {
  brandNameEn: string;
  brandNameKo: string;
  logoImage?: string;
  brandId?: string;
  timestamp?: string; // 클릭한 시간을 기록하는 필드
  logos?: string;
};

type LikedState = {
  productsData: { [key: string]: Product };
  brandsData: { [key: string]: Brand };
  fetchLikedData: () => Promise<void>;
  handleProductClick: (productUid: string) => Promise<void>;
  handleBrandClick: (brandId: string) => Promise<void>;
  handleDeleteProduct: (productUid: string) => Promise<void>;
  handleDeleteBrand: (brandId: string) => Promise<void>;
};

export const useLikedStore = create<LikedState>(set => ({
  productsData: {},
  brandsData: {},

  // Firestore에서 liked 필드 데이터를 가져오는 함수
  fetchLikedData: async () => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return;
    }

    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF'); // Firestore 문서 참조
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const likedData = data?.liked;

        if (likedData) {
          set({
            productsData: likedData.products || {},
            brandsData: likedData.brands || {},
          });
        } else {
          set({ productsData: {}, brandsData: {} });
        }
      } else {
        console.log('myproducts 문서가 존재하지 않음');
        set({ productsData: {}, brandsData: {} });
      }
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      set({ productsData: {}, brandsData: {} });
    }
  },

  // 상품 클릭 시 timestamp를 기록하는 함수
  handleProductClick: async (productUid: string) => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return;
    }

    const timestamp = new Date().toISOString(); // 현재 시간을 기록
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF');
      await updateDoc(docRef, {
        [`liked.products.${productUid}.timestamp`]: timestamp, // Firestore에 timestamp 저장
      });
      set(state => ({
        productsData: {
          ...state.productsData,
          [productUid]: {
            ...state.productsData[productUid],
            timestamp,
          },
        },
      }));
      console.log('Timestamp 저장 성공:', timestamp);
    } catch (error) {
      console.error('Timestamp 저장 실패:', error);
    }
  },

  // 브랜드 클릭 시 timestamp를 기록하는 함수
  handleBrandClick: async (brandId: string) => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return;
    }

    const timestamp = new Date().toISOString(); // 현재 시간을 기록
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF');
      await updateDoc(docRef, {
        [`liked.brands.${brandId}.timestamp`]: timestamp, // Firestore에 timestamp 저장
      });
      set(state => ({
        brandsData: {
          ...state.brandsData,
          [brandId]: {
            ...state.brandsData[brandId],
            timestamp,
          },
        },
      }));
      console.log('Timestamp 저장 성공:', timestamp);
    } catch (error) {
      console.error('Timestamp 저장 실패:', error);
    }
  },

  // Firestore에서 상품 삭제 옮김.
  handleDeleteProduct: async (productUid: string) => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return;
    }

    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('myproducts 문서가 존재하지 않음');
        return;
      }

      const data = docSnap.data();
      const likedData = data?.liked;

      if (likedData && likedData.products) {
        const updatedProducts = { ...likedData.products };
        delete updatedProducts[productUid]; // 상품 삭제

        await updateDoc(docRef, {
          'liked.products': updatedProducts, // 업데이트된 products 저장
        });

        set({ productsData: updatedProducts });
      }
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
    }
  },

  // Firestore에서 브랜드 삭제 옮김.
  handleDeleteBrand: async (brandId: string) => {
    // 'myLiked' 컬렉션에서 해당 사용자 문서 참조
    try {
      const docRef = doc(db, 'myproducts', user.uid);

      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        console.log('myproducts 문서가 존재하지 않음');
        return;
      }

      const data = docSnap.data();
      const likedData = data?.liked;

      if (likedData && likedData.brands) {
        const updatedBrands = { ...likedData.brands };
        delete updatedBrands[brandId]; // 브랜드 삭제

        await updateDoc(docRef, {
          'liked.brands': updatedBrands, // 업데이트된 brands 저장
        });

        // 상태 업데이트하여 화면에 반영
        setBrandsData(updatedBrands);
      }
    } catch (error) {
      console.error('Firestore에서 브랜드 삭제 중 오류 발생:', error);
    }
  },
}));
