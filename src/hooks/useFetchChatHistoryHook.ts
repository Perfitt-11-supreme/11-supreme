import { DataSnapshot, DatabaseReference, onValue, orderByChild, query, ref } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import { database } from '../firebase/firebase';
import useBrandStore from '../stores/useBrandStore';
import useChatStore from '../stores/useChatStore';
import useProductStore from '../stores/useProductsStore';
import useUIStateStore from '../stores/useUIStateStore';
import useUserStore from '../stores/useUserStore';
import { ChatItem } from '../types/chatItem';

// Firebase에서 채팅 기록 불러오기 사이드메뉴에서 불러오는 훅 아닙니다!!!! LoginHello에서 사용하는 훅
const useFetchChatHistoryHook = (currentChatId: string | null) => {
  const { user } = useUserStore();
  const { setCurrentKeywords, setChatHistory } = useChatStore();
  const { setProducts } = useProductStore();
  const { setShowChatBotAndRecommend } = useUIStateStore();
  const { setBrands } = useBrandStore();

  const messagesRefCleanup = useRef<(() => void) | null>(null);
  const [firebaseChatItems, setFirebaseChatItems] = useState<ChatItem[]>([]);
  useEffect(() => {
    // Cleanup 이전 구독 해제
    if (messagesRefCleanup.current) {
      messagesRefCleanup.current();
      messagesRefCleanup.current = null;
    }

    // 현재 사용자와 채팅 ID가 유효한 경우
    if (user?.uid && currentChatId) {
      const messagesRef: DatabaseReference = ref(database, `users/${user.uid}/chats/${currentChatId}/messages`);
      // 쿼리 생성
      const messagesQuery = query(messagesRef, orderByChild('timestamp'));

      const handleSnapshot = (snapshot: DataSnapshot) => {
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

        setFirebaseChatItems(chatItems);

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
          // setCurrentKeywords(lastChatItem.keywords);
        } else {
          setChatHistory([]);
          setProducts([]);
          setBrands([]);
          setCurrentKeywords('');
          setShowChatBotAndRecommend(false);
        }
      };

      // 쿼리에서 값 변경 이벤트를 수신
     const unsubscribe = onValue(messagesQuery, handleSnapshot);

      messagesRefCleanup.current = () => unsubscribe();
    } else {
      // 사용자나 채팅 ID가 없을 경우 상태 초기화
      setChatHistory([]);
      setProducts([]);
      setBrands([]);
      setCurrentKeywords('');
      setShowChatBotAndRecommend(false);
    }

    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (messagesRefCleanup.current) {
        messagesRefCleanup.current();
      }
    };
  }, [user, currentChatId, setProducts, setBrands, setChatHistory, setCurrentKeywords, setShowChatBotAndRecommend]);
  // Firebase에서 가져온 데이터만 setChatHistory에 설정
  useEffect(() => {
    setChatHistory(firebaseChatItems);
  }, [firebaseChatItems, setChatHistory]);

  return firebaseChatItems;
};


export default useFetchChatHistoryHook;
