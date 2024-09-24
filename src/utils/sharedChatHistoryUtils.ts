import { get, ref } from 'firebase/database';
import { database } from '../firebase/firebase';

export const fetchShareId = async (userId:string, targetId: string): Promise<string | null> => {
  if (!userId || !targetId) return null;
  try {
    const messagesRef = ref(database, `users/${userId}/chats`);
    const snapshot = await get(messagesRef);

    if (snapshot.exists()) {
      const chats = snapshot.val();
      
      // 모든 채팅과 메시지 검색
      for (const chatId in chats) {
        const messages = chats[chatId].messages;
        for (const messageId in messages) {
          const message = messages[messageId];
          if (message.shareId === targetId) {
            return targetId; // 일치하는 공유 ID 반환
          }
        }
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