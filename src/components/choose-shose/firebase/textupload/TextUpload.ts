//리액트
import { useEffect, useState } from 'react';
// Zustand
import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useUserStore from '../../../../stores/useUserStore';
// 파이어베이스
import { USER_COLLECTION } from '../../../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
// 터입
import { TUser } from '../../../../types/user';

export const TextUpload = () => {
  const { textRecord, setLoading, downloadTextRecord } = useTextSearchStore();
  const { user } = useUserStore();
  const [pageLoad, setPageLoad] = useState(false);

  // 검색기록이 바뀔 때 검색기록 업로드
  useEffect(() => {
    if (pageLoad) {
      console.log('검색 기록 업로드');
      handleTextUpload();
    }
  }, [textRecord]);

  const handleTextUpload = async () => {
    const userDoc = doc(USER_COLLECTION, user?.uid);
    // 배열을 문자열로 압축
    const compressedRecord = JSON.stringify(textRecord);

    await updateDoc(userDoc, {
      // JSON 문자열로 저장
      textSearchRecord: compressedRecord,
    });
  };

  const handleTextDownload = async () => {
    if (user?.uid) {
      if (textRecord.length === 0) {
        try {
          setLoading(true);
          const userDocRef = doc(USER_COLLECTION, user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData: TUser = userDoc.data();

            const textSearchRecord = userData.textSearchRecord
              ? JSON.parse(userData.textSearchRecord) // JSON 문자열을 배열로 전환
              : []; // 저장된 값이 없다면 빈배열

            if (Array.isArray(textSearchRecord) && textSearchRecord.length > 0) {
              console.log('검색 기록 다운로드');
              console.log(textSearchRecord);
              // 다운로드 받은 텍스트 배열 zustand에 저장
              downloadTextRecord(textSearchRecord);
            } else {
              console.log('검색 기록이 비어있습니다');
            }
          }
        } catch (error) {
          console.log('사용자 정보를 가져오는 중 오류 발생');
        } finally {
          setLoading(false);
          setPageLoad(true);
        }
      } else {
        console.log('이미 검색 기록을 가지고 있습니다.');
      }
    } else {
      console.log('해당 UID를 가진 사용자가 없습니다.');
    }
  };

  return handleTextDownload;
};
