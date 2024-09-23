import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';

export const fetchShareId = async (targetId: string): Promise<string | null> => {
  if (!targetId) return null;
  try {
    const sharedChatHistoryRef = ref(database, 'sharedChatHistory');
    const snapshot = await get(sharedChatHistoryRef);

    if (snapshot.exists()) {
      const sharedHistory = snapshot.val();
      
      // 타겟 ID와 일치하는 키 찾기
      const matchingKey = Object.keys(sharedHistory).find(key => key === targetId);

      if (matchingKey) {
        return matchingKey;
      }

      console.log("일치하는 공유 채팅 기록을 찾을 수 없습니다.");
      return null;
    } else {
      console.log("공유 채팅 기록을 사용할 수 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("공유 채팅 기록을 가져오는 동안 오류가 발생했습니다:", error);
    return null;
  }
};