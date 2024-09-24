// useChatHistory.ts (데이터 가져오는 로직)
import { get, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';

type ChatHistory = {
  keywords: string;
  timestamp: string;
  id: string;
};

const useChatHistoryHook = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const chatHistoryRef = ref(database, 'chatHistory');
        const snapshot = await get(chatHistoryRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // chatHistory 의 각 객체를 감싼 id값에 접근
          const chatList = Object.keys(data).map(key => ({
            id: key,
            keywords: data[key].keywords,
            timestamp: data[key].timestamp,
          }));
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
  }, []);

  // 데이터 삭제 함수 추가
  const deleteChatHistory = async (id: string) => {
    try {
      const chatHistoryRef = ref(database, `chatHistory/${id}`);
      await remove(chatHistoryRef);
      // 삭제 후 상태 업데이트
      setChatHistory(prev => prev.filter(chat => chat.id !== id));
      console.log('chatHistory', chatHistory);
    } catch (error) {
      setError('데이터를 삭제하는 중 오류가 발생했습니다.');
    }
  };

  return { chatHistory, loading, error, deleteChatHistory };
};

export default useChatHistoryHook;
