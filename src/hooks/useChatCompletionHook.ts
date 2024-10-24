import { useMutation } from '@tanstack/react-query';
import { push, ref, set } from 'firebase/database';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { chatCompletionsAPI } from '../api/chatRequests';
import { database } from '../firebase/firebase';
import useBrandStore from '../stores/useBrandStore';
import useChatStore from '../stores/useChatStore';
import useProductStore from '../stores/useProductsStore';
import useUserStore from '../stores/useUserStore';
import { ChatItem } from '../types/chatItem';

const CHAT_ID_KEY = 'currentChatId';

export const useChatCompletion = () => {
  const { user } = useUserStore();
  const { setProducts } = useProductStore();
  const { setBrands } = useBrandStore();
  const {chatId} = useParams()
  const { setCurrentKeywords, setCurrentChatId, currentChatId } = useChatStore();

  useEffect(() => {
    // const storedChatId = localStorage.getItem(CHAT_ID_KEY);
    if (chatId) {
      setCurrentChatId(chatId);
    }
  }, [setCurrentChatId]);

  const createNewChat = async () => {
    if (!user?.uid) return null;
    const newChatRef = push(ref(database, `users/${user.uid}/chats`));
    const newChatId = newChatRef.key;
    await set(newChatRef, { createdAt: new Date().toISOString() });
    setCurrentChatId(newChatId);
    if (newChatId) {
      localStorage.setItem(CHAT_ID_KEY, newChatId);
    }
    // console.log("새로운 채팅방 아이디", newChatId);
    return newChatId;
  };

  const chatCompletionsMutation = useMutation({
    mutationFn: async (question: string) => {
      let chatId = useChatStore.getState().currentChatId;
      if (!chatId) {
        chatId = await createNewChat();
      }
      const response = await chatCompletionsAPI({ message: { content: question } });
      return { response, chatId };
    },
    onSuccess: async ({ response, chatId }, question) => {
      // console.log('채팅 응답 성공:', response);

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
        id: push(ref(database, `users/${user?.uid}/chats/${chatId}/messages`)).key || '',
        shareId,
        ...chatItemWithoutIds,
      };

      if (user?.uid && chatId) {
        await set(ref(database, `users/${user.uid}/chats/${chatId}/messages/${newChatItem.id}`), newChatItem);
      }

      setProducts(response.data.products);
      setBrands(response.data.brands);
      setCurrentKeywords(question);
      // addChatItem(newChatItem);
    },
    onError: error => {
      console.error('채팅 응답 에러:', error);
      if (error instanceof Error) {
        console.error('에러 메시지:', error.message);
        console.error('에러 스택:', error.stack);
      }
    },
  });

  const saveSharedChatHistory = async (chatItem: Omit<ChatItem, 'id' | 'shareId'>): Promise<string> => {
    const shareId = push(ref(database, 'sharedChatHistory')).key;
    if (shareId) {
      await set(ref(database, `sharedChatHistory/${shareId}`), chatItem);
      // console.log('공유용 채팅 히스토리 저장 성공:', shareId);
      return shareId;
    }
    throw new Error('Failed to generate shareId');
  };

  const handleQuestionSelect = (question: string) => {
    setCurrentKeywords(question);
    chatCompletionsMutation.mutate(question);
  };

  const handleNewChat = async () => {
    const newChatId = await createNewChat();
    return newChatId;
  };

  return { handleQuestionSelect, chatCompletionsMutation, handleNewChat, currentChatId,createNewChat };
};