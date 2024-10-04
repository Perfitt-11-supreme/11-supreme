import { DataSnapshot, DatabaseReference, getDatabase, off, onValue, orderByChild, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import useBrandStore from '../stores/useBrandStore';
import useChatStore from '../stores/useChatStore';
import useProductStore from '../stores/useProductsStore';
import useUIStateStore from '../stores/useUIStateStore';
import useUserStore from '../stores/useUserStore';
import { ChatItem } from '../types/chatItem';

// Firebase에서 채팅 기록 불러오기 사이드메뉴에서 불러오는 훅 아닙니다!!!! LoginHello에서 사용하는 훅
const useFetchChatHistory = (currentChatId: string | null) => {
  const { user } = useUserStore();
  const { setCurrentKeywords, setChatHistory } = useChatStore();
  const { setProducts } = useProductStore();
  const { setShowChatBotAndRecommend } = useUIStateStore();
  const { setBrands } = useBrandStore();

  const [data, setData] = useState<ChatItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let dbRef: DatabaseReference;

    const connect = () => {
      setLoading(true);
      if (user?.uid && currentChatId) {
        const db = getDatabase();
        dbRef = ref(db, `users/${user.uid}/chats/${currentChatId}/messages`);
        const messagesQuery = query(dbRef, orderByChild('timestamp'));

        onValue(messagesQuery, (snapshot: DataSnapshot) => {
          const chatItems: ChatItem[] = [];

          snapshot.forEach((messageSnapshot: DataSnapshot) => {
            const messageId = messageSnapshot.key;
            const message = messageSnapshot.val();
            if (messageId && message) {
              chatItems.push({
                ...message,
                id: messageId,
              });
            }
          });

          setData(chatItems);
          setLoading(false);

           // 채팅 항목 처리
          if (chatItems.length > 0) {
            setChatHistory(chatItems);
            const lastChatItem = chatItems[chatItems.length - 1];
            if (lastChatItem.products) {
              setProducts(lastChatItem.products);
              setShowChatBotAndRecommend(true);
            } else {
              setProducts([]);
              setShowChatBotAndRecommend(false);
            }
            if (lastChatItem.brands) {
              setBrands(lastChatItem.brands);
            }
          } else {
            setChatHistory([]);
            setProducts([]);
            setBrands([]);
            setCurrentKeywords('');
            setShowChatBotAndRecommend(false);
          }
        });
      } else {
        // user 또는 chatId가 없을 경우 상태 초기화
        setData(null);
        setChatHistory([]);
        setProducts([]);
        setBrands([]);
        setCurrentKeywords('');
        setShowChatBotAndRecommend(false);
        setLoading(false);
      }
    };

    const disconnect = () => {
      if (dbRef) {
        off(dbRef);
      }
    };

    // 초기 연결
    connect();

      // bfcache 관련 이벤트 처리
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        connect(); // 페이지가 bfcache에서 복원된 경우 Firebase 재연결
      }
    };

    const handlePageHide = () => {
      disconnect(); // 페이지가 숨겨질 때 Firebase 연결 해제
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);

    // 클린업 함수
    return () => {
      disconnect();
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [user, currentChatId, setProducts, setBrands, setChatHistory, setCurrentKeywords, setShowChatBotAndRecommend]);

  return { data, loading };
};

export default useFetchChatHistory;