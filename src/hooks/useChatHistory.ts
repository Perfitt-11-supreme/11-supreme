// useChatHistory.ts (데이터 가져오는 로직)
import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebase/firebase';

type ChatHistory = {
  keywords: string;
  timestamp: string;
  id: string;
};

const useChatHistory = () => {
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
          const chatList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
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

  return { chatHistory, loading, error };
};

export default useChatHistory;
