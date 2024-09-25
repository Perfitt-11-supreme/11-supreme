// useStore.ts
import { create } from 'zustand';

type StoreState = {
  showChatBotAndRecommend: boolean;
  hasSetInitialKeywords: boolean;
  selectedKeywords: string[];
  setShowChatBotAndRecommend: (show: boolean) => void;
  setHasSetInitialKeywords: (hasSet: boolean) => void;
  setSelectedKeywords: (keywords: string[]) => void;
};

const useUIStateStore = create<StoreState>((set) => ({
  showChatBotAndRecommend: false,
  hasSetInitialKeywords: false,
  selectedKeywords: [],
  setShowChatBotAndRecommend: (show) => set({ showChatBotAndRecommend: show }),
  setHasSetInitialKeywords: (hasSet) => set({ hasSetInitialKeywords: hasSet }),
  setSelectedKeywords: (keywords: string[]) => set({ selectedKeywords: keywords }),
}));

export default useUIStateStore;
