import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useUserStore from './useUserStore';
import { create } from 'zustand';

type Product = {
  brand?: string;
  image: string;
  link: string;
  modelName: string;
  price: number;
  sizeRecommend: string;
  uid: string;
  timestamp?: string; // 클릭한 시간을 기록하는 필드 추가
};

type ViewedHistoryState = {
  productsData: { [key: string]: Product };
  fetchViewedData: () => Promise<void>;
  handleCardClick: (productUid: string) => Promise<void>;
};

export const useViewedHistoryStore = create<ViewedHistoryState>(set => ({
  productsData: {},

  // Firestore에서 viewedHistory 필드 데이터를 가져오는 함수
  fetchViewedData: async () => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return; // 사용자가 없으면 중단
    }

    try {
      const viewedUid = { ...db, uid: user?.uid };
      const docRef = await addDoc(collection(db, 'myproducts'), viewedUid);
      console.log('db 저장 성공 ID: ', docRef.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data(); // 문서의 데이터를 가져옴
        const viewedData = data?.viewedHistory; // 'viewedHistory' 필드에 접근

        if (viewedData && Object.keys(viewedData).length > 0) {
          set({ productsData: viewedData }); // 상태 업데이트
        } else {
          console.log('No products found in Firestore viewedHistory field');
          set({ productsData: {} }); // 비어있을 때 빈 객체 설정
        }
      } else {
        console.log('myproducts 문서가 존재하지 않음');
        set({ productsData: {} }); // 문서가 없을 때 빈 객체 설정
      }
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      set({ productsData: {} }); // 에러 발생 시 빈 객체 설정
    }
  },

  // 클릭 시 timestamp를 기록하는 함수
  handleCardClick: async (productUid: string) => {
    const { user } = useUserStore.getState(); // Zustand에서 user 정보 가져오기

    if (!user?.uid) {
      console.log('User가 없습니다.');
      return; // 사용자가 없으면 중단
    }

    const timestamp = new Date().toISOString(); // 현재 시간을 기록
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF');
      //   const docRef = doc(db, 'myproducts', user.uid); // Firestore 문서 참조 (user별로 데이터 관리)- 채팅에 추천상품들 뜨면 주석해제
      await updateDoc(docRef, {
        [`viewedHistory.${productUid}.timestamp`]: timestamp, // Firestore에 timestamp 저장
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
}));
