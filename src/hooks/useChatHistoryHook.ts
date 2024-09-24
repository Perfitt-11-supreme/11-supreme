import { get, limitToLast, orderByKey, query, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';
import useUserStore from '../stores/useUserStore';

type ChatHistory = {
  shareId: string;
  keywords: string;
  timestamp: string;
  id: string;
};

const useChatHistoryHook = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!user?.uid) {
        setChatHistory([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 모든 채팅방의 마지막 메시지를 가져오기
        const userChatsRef = ref(database, `users/${user.uid}/chats`);
        const snapshot = await get(userChatsRef);

        if (snapshot.exists()) {
          const chats = snapshot.val();
          const chatList: ChatHistory[] = [];

          for (const chatId in chats) {
            const messagesRef = query(
              ref(database, `users/${user.uid}/chats/${chatId}/messages`),
              orderByKey(),
              limitToLast(1)
            );
            const messageSnapshot = await get(messagesRef);
            
            if (messageSnapshot.exists()) {
              const messageData = messageSnapshot.val();
              const messageId = Object.keys(messageData)[0];
              const message = messageData[messageId];

              chatList.push({
                id: chatId,
                keywords: message.keywords || '',
                timestamp: message.timestamp || '',
                shareId: message.shareId || ''
              });
            }
          }

          setChatHistory(chatList);
        } else {
          setChatHistory([]);
        }
      } catch (error) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [user?.uid]); // user?.uid가 변경될 때마다 실행

  // 데이터 삭제 함수 수정
  const deleteChatHistory = async (chatId: string) => {
    if (!user?.uid) return;

    try {
      const chatRef = ref(database, `users/${user.uid}/chats/${chatId}`);
      await remove(chatRef);
      // 삭제 후 상태 업데이트
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    } catch (error) {
      setError('데이터를 삭제하는 중 오류가 발생했습니다.');
    }
  };

  return { chatHistory, loading, error, deleteChatHistory };
};

export default useChatHistoryHook;