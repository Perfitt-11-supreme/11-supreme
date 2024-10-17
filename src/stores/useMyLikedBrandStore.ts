import { create } from 'zustand';
import { doc, getDoc, updateDoc, deleteField } from 'firebase/firestore';
import { LIKED_COLLECTION } from '../firebase/firebase';

type Brand = {
  brandNameEn?: string;
  brandNameKo?: string;
  logoImage?: string;
  brandId?: string;
  timestamp?: string; // 클릭한 시간을 기록하는 필드
  logos?: string;
  isLiked?: boolean; // 추가된 필드
};

type MyLikedBrandStore = {
  brandsData: { [key: string]: Brand };
  setBrandsData: (brands: { [key: string]: Brand }) => void;
  addBrand: (uid: string, brandId: string, brand: Brand) => Promise<void>;
  deleteBrand: (uid: string, brandId: string) => Promise<void>;
  fetchBrandsData: (userId: string) => Promise<void>;
};

const useMyLikedBrandStore = create<MyLikedBrandStore>(set => ({
  brandsData: {},
  setBrandsData: brands => set({ brandsData: brands }),

  addBrand: async (uid, brandId, brand) => {
    // Firestore에 브랜드 추가
    const userDoc = doc(LIKED_COLLECTION, uid);
    await updateDoc(userDoc, {
      [`brands.${brandId}`]: { ...brand, isLiked: true }, // isLiked 추가
    });

    set(state => ({
      brandsData: { ...state.brandsData, [brandId]: { ...brand, isLiked: true } },
    }));
  },

  deleteBrand: async (uid, brandId) => {
    const userDoc = doc(LIKED_COLLECTION, uid);
    await updateDoc(userDoc, {
      [`brands.${brandId}`]: deleteField(),
    });

    set(state => {
      const updatedBrands = { ...state.brandsData };
      delete updatedBrands[brandId];
      return { brandsData: updatedBrands };
    });
  },

  fetchBrandsData: async userId => {
    const userDoc = doc(LIKED_COLLECTION, userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const brandsData = data?.brands || {};

      // Fetch 시 isLiked가 true로 설정되어 있도록
      const updatedBrandsData = Object.entries(brandsData).reduce((acc, [brandId, brandInfo]) => {
        if (typeof brandInfo === 'object' && brandInfo !== null) {
          acc[brandId] = { ...brandInfo, isLiked: true }; // isLiked 추가
        } else {
          // brandInfo가 객체가 아닐 경우 처리 (에러 방지를 위해)
          acc[brandId] = { isLiked: true }; // 최소한 isLiked만 추가
        }
        return acc;
      }, {} as { [key: string]: Brand });

      set({ brandsData: updatedBrandsData });
    }
  },
}));

export default useMyLikedBrandStore;
