import useTextSearchStore from '../../../../stores/useTextSearchStore';
import useUserStore from '../../../../stores/useUserStore';
import { USER_COLLECTION } from '../../../../firebase/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { TUser } from '../../../../types/user';
import { useEffect, useState } from 'react';

export const FetchTextRecord = () => {
  const { textRecord, setState, downloadTextRecord } = useTextSearchStore();
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
    await updateDoc(userDoc, {
      textSearchRecord: textRecord,
    });
  };

  const handleTextDownload = async () => {
    if (user?.uid) {
      if (textRecord.length === 0) {
        try {
          setState({ isLoading: true });
          const userDocRef = doc(USER_COLLECTION, user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData: TUser = userDoc.data();

            if (userData.textSearchRecord !== undefined && userData.textSearchRecord.length > 0) {
              const textSearchRecord = userData.textSearchRecord;

              console.log('검색 기록 다운로드');
              console.log(textSearchRecord);
              downloadTextRecord(textSearchRecord);
            } else {
              console.log('검색 기록이 비어있습니다');
            }
          }
        } catch (error) {
          console.log('사용자 정보를 가져오는 중 오류 발생');
        } finally {
          setState({ isLoading: false });
          setPageLoad(true);
        }
      } else {
        console.log('이미 검색 기록을 가지고 있습니다.');
      }
    } else {
      console.log('해당 UID를 가진 사용자가 없습니다.');
    }
  };

  return { handleTextDownload };
};
