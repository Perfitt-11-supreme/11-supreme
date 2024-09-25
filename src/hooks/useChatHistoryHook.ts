import { get, limitToLast, onValue, orderByKey, query, ref, remove } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';
import useBrandStore from '../stores/useBrandStore';
import useChatStore from '../stores/useChatStore';
import useProductStore from '../stores/useProductsStore';
import useUIStateStore from '../stores/useUIStateStore';
import useUserStore from '../stores/useUserStore';
import { ChatItem } from '../types/chatItem';

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
  const {  setCurrentKeywords,currentChatId } = useChatStore();
  const { setProducts } = useProductStore();
  const { setShowChatBotAndRecommend} = useUIStateStore()
  const { setBrands} = useBrandStore();
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

  // Firebase에서 채팅 기록 불러오기
 
    useEffect(() => {
      if (user?.uid && currentChatId) {
        const messagesRef = ref(database, `users/${user.uid}/chats/${currentChatId}/messages`);
        const unsubscribe = onValue(messagesRef, (snapshot) => {
          const chatItems: ChatItem[] = [];
  
          snapshot.forEach((messageSnapshot) => {
            const messageId = messageSnapshot.key;
            const message = messageSnapshot.val();
            if (messageId && message) {
              chatItems.push({
                ...message,
                id: messageId,
              });
            }
          });
  
          chatItems.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
          if (chatItems.length > 0) {
            setChatHistory(chatItems);
            const lastChatItem = chatItems[chatItems.length - 1];
            if (lastChatItem.products) {
              setProducts(lastChatItem.products);
              setShowChatBotAndRecommend(true);  // 제품이 있을 때만 추천 표시
            } else {
              setProducts([]);
              setShowChatBotAndRecommend(false);  // 제품이 없으면 추천 숨김
            }
            if (lastChatItem.brands) {
              setBrands(lastChatItem.brands);
            }
            setCurrentKeywords(lastChatItem.keywords);
          } else {
            setChatHistory([]);
            setProducts([]);
            setBrands([]);
            setCurrentKeywords('');
            setShowChatBotAndRecommend(false);// 채팅 기록이 없으면 추천 숨김
          }
        });
  
        return () => unsubscribe();
      } else {
        setChatHistory([]);
        setProducts([]);
        setBrands([]);
        setCurrentKeywords('');
        setShowChatBotAndRecommend(false);// 사용자나 채팅 ID가 없으면 추천 숨김
      }
    }, [user, currentChatId, setProducts, setBrands, setChatHistory, setCurrentKeywords]);



  return { chatHistory, loading, error, deleteChatHistory};
};

export default useChatHistoryHook;