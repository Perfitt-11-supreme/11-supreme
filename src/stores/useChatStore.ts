import { create } from 'zustand';
import { ChatItem } from '../types/chatItem';

interface ChatState {
  chatHistory: ChatItem[];
  currentKeywords: string;
  addChatItem: (item: ChatItem) => void;
  setCurrentKeywords: (keywords: string) => void;
  setChatHistory: (history: ChatItem[]) => void; 
  
}

const useChatStore = create<ChatState>((set) => ({
  chatHistory: [],
  currentKeywords: '',
  addChatItem: (item) => set((state) => ({ chatHistory: [...state.chatHistory, item] })),
  setCurrentKeywords: (keywords) => set({ currentKeywords: keywords }),
  setChatHistory: (history) => set({ chatHistory: history }), 

}));

export default useChatStore;