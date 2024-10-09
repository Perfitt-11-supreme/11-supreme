import { create } from 'zustand';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

type UidAddStore = {
  addUidToFirestore: (uid: string) => Promise<void>;
};

const useUidAddStore = create<UidAddStore>(() => ({
  addUidToFirestore: async uid => {
    try {
      // 'myLiked'와 'myViewed' 컬렉션에 사용자 문서 생성
      const likedDocRef = doc(db, 'myLiked', uid);
      const viewedDocRef = doc(db, 'myViewed', uid);

      // Firestore에 빈 데이터로 문서 생성 (uid만 포함)
      await setDoc(likedDocRef, { uid, products: {}, brands: {} });
      await setDoc(viewedDocRef, { uid, products: {} });

      console.log('myLiked, myViewed에 uid값 추가... 성공');
    } catch (error) {
      console.error('myLiked, myViewed에 uid값 추가... 실패', error);
    }
  },
}));

export default useUidAddStore;
