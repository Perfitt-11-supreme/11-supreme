import { create } from 'zustand';
import { ChatItem } from '../types/chatItem';

type ChatState = {
  chatHistory: ChatItem[];
  currentKeywords: string;
  currentChatId: string | null;
  addChatItem: (item: ChatItem) => void;
  setCurrentKeywords: (keywords: string) => void;
  setChatHistory: (history: ChatItem[]) => void;
  setCurrentChatId: (chatId: string | null) => void;
}

const useChatStore = create<ChatState>((set) => ({
  chatHistory: [],
  currentKeywords: '',
  currentChatId: null,
  addChatItem: (item) => set((state) => ({ chatHistory: [...state.chatHistory, item] })),
  setCurrentKeywords: (keywords) => set({ currentKeywords: keywords }),
  setChatHistory: (history) => set({ chatHistory: history }),
  setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

export default useChatStore;