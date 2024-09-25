import { onValue, ref } from 'firebase/database';
import { useEffect } from 'react';
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
  const {  setCurrentKeywords,setChatHistory } = useChatStore();
  const { setProducts } = useProductStore();
  const { setShowChatBotAndRecommend} = useUIStateStore()
  const { setBrands } = useBrandStore();

 
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

}
export default useFetchChatHistoryHook