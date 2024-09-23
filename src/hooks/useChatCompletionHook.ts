import { useMutation } from '@tanstack/react-query';
import { push, ref, set } from 'firebase/database';
import { chatCompletionsAPI } from '../api/chatRequests';

import { database } from '../firebase/firebase';
import useBrandStore from '../stores/useBrandStore';
import useChatStore from '../stores/useChatStore';
import useProductStore from '../stores/useProductsStore';
import useUserStore from '../stores/useUserStore';
import { ChatItem } from '../types/chatItem';

export const useChatCompletion = () => {
  const { user } = useUserStore();
  const { setProducts } = useProductStore();
  const { setBrands } = useBrandStore();
  const { addChatItem, setCurrentKeywords } = useChatStore();

  const chatCompletionsMutation = useMutation({
    mutationFn: (question: string) => chatCompletionsAPI({ message: { content: question } }),
    onSuccess: async (response, question) => {
      console.log('채팅 응답 성공:', response);

      const chatItemWithoutIds = {
        userQuestion: question || '',
        botResponse: response.data.message,
        products: response.data.products || null,
        brands: response.data.brands || null,
        keywords: question || '',
        timestamp: new Date().toISOString(),
      };

      const shareId = await saveSharedChatHistory(chatItemWithoutIds);

      const newChatItem = {
        id: push(ref(database, 'chatHistory')).key || '',
        shareId,
        ...chatItemWithoutIds,
      };

      if (user?.uid) {
        push(ref(database, `chatHistory/${user.uid}`), newChatItem);
      }
      setProducts(response.data.products);
      setBrands(response.data.brands);
      setCurrentKeywords(question);
      addChatItem(newChatItem);
    },
    onError: error => {
      console.error('채팅 응답 에러:', error);
    },
  });

  const saveSharedChatHistory = async (chatItem: Omit<ChatItem, 'id' | 'shareId'>): Promise<string> => {
    const shareId = push(ref(database, 'sharedChatHistory')).key;
    if (shareId) {
      await set(ref(database, `sharedChatHistory/${shareId}`), chatItem);
      console.log('공유용 채팅 히스토리 저장 성공:', shareId);
      return shareId;
    }
    throw new Error('Failed to generate shareId');
  };

  const handleQuestionSelect = (question: string) => {
    setCurrentKeywords(question);
    chatCompletionsMutation.mutate(question);
  };

  return { handleQuestionSelect, chatCompletionsMutation };
};