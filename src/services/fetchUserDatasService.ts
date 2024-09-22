import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { TUser } from '../types/user';

// Firestore에서 사용자 데이터를 가져오는 함수
export const fetchUserDatas = async (uid: string): Promise<TUser | null> => {
  try {
    // 'users' 컬렉션 참조
    const USER_COLLECTION = collection(db, 'users');
    // uid가 일치하는 문서를 쿼리
    const userQuery = query(USER_COLLECTION, where('uid', '==', uid));
    // 쿼리 실행하여 문서 가져오기
    const userSnapshot = await getDocs(userQuery);

    // 사용자 데이터를 저장할 배열
    const usersData: TUser[] = [];
    userSnapshot.forEach(doc => {
      const data = doc.data() as TUser; // TUser 타입으로 데이터 캐스팅
      usersData.push(data);
    });

    // 첫 번째 사용자 데이터를 반환 (해당하는 uid가 있는 경우)
    if (usersData.length > 0) {
      return usersData[0]; // 첫 번째 사용자 데이터 반환
    } else {
      console.log('사용자 데이터를 찾을 수 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('사용자 데이터를 가져오는 중 오류 발생: ', error);
    return null;
  }
};
