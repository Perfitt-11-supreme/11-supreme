import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, limitToLast, orderByKey, query, ref, remove } from 'firebase/database';
import { database } from '../firebase/firebase';
import useUserStore from '../stores/useUserStore';

type ChatHistory = {
  shareId: string;
  keywords: string;
  timestamp: string;
  id: string;
};

const fetchChatHistory = async (userId: string): Promise<ChatHistory[]> => {
  if (!userId) return [];

  const userChatsRef = ref(database, `users/${userId}/chats`);
  const snapshot = await get(userChatsRef);

  if (!snapshot.exists()) return [];

  const chats = snapshot.val();
  const chatList: ChatHistory[] = [];

  for (const chatId in chats) {
    const messagesRef = query(
      ref(database, `users/${userId}/chats/${chatId}/messages`),
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
        shareId: message.shareId || '',
      });
    }
  }

  return chatList;
};

const useChatHistoryHook = () => {
  const { user } = useUserStore(); // user 정보 가져오기
  const queryClient = useQueryClient();

  const {
    data: chatHistory = [],
    isLoading: chatHistoryIsLoading,
    error: chatHistoryError,
    isFetching:chatHistoryIsFetching
  } = useQuery<ChatHistory[], Error>({
    queryKey: ['chatHistory', user?.uid],
    queryFn: () => fetchChatHistory(user?.uid || ''),
    enabled: !!user?.uid,
    staleTime: 30 * 60 * 1000, // 30분 동안 데이터를 "신선"하다고 간주
    gcTime: 60 * 60 * 1000, // 60분 동안 캐시 유지
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // 데이터 삭제 함수 추가
  const deleteChatMutation = useMutation({
    mutationFn: async (chatId: string) => {
      if (!user?.uid) throw new Error('User not found');
      const chatRef = ref(database, `users/${user.uid}/chats/${chatId}`);
      await remove(chatRef);
      return chatId;
    },
    onSuccess: (deletedChatId) => {
      queryClient.setQueryData<ChatHistory[]>(['chatHistory', user?.uid], (oldData) =>
        oldData ? oldData.filter((chat) => chat.id !== deletedChatId) : []
      );
    },
  });

  return {
    chatHistory,
    chatHistoryIsLoading,
    chatHistoryError,
    chatHistoryIsFetching,
    deleteChatHistory: deleteChatMutation.mutate,
  };
};

export default useChatHistoryHook;
