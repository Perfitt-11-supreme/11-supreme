import { create } from 'zustand';

type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
  setIsState: (changedState: Partial<ImageSearchStateStore>) => void;
};

const useImageSearchStore = create<ImageSearchStateStore>(set => ({
  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  isGallery: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),
}));

export default useImageSearchStore;
