import { create } from 'zustand';

type ImageSearchStore = {
  handleClickAgain: () => void;
};

type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
  setIsState: (changedState: Partial<ImageSearchStateStore>) => void;
};

const useImageSearchStore = create<ImageSearchStore & ImageSearchStateStore>(set => ({
  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  isGallery: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),

  handleClickAgain: () => {
    set(state => {
      state.setIsState({ isAnalyze: false, isSuccess: false });
      return {};
    });
  },
}));

export default useImageSearchStore;
