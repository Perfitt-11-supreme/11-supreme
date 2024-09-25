import { create } from 'zustand';

type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
  setAnalyze: (isAnalyze: boolean) => void;
  setSuccess: (isSuccess: boolean) => void;
  setSimilar: (isSimilare: boolean) => void;
  resetState: () => void;
};

const useImageSearchStore = create<ImageSearchStateStore>(set => ({
  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  setAnalyze: isAnalyze =>
    set(state => {
      if (isAnalyze !== state.isAnalyze) {
        return { isAnalyze };
      }
      return state;
    }),
  setSuccess: isSuccess =>
    set(state => {
      if (isSuccess !== state.isSuccess) {
        return { isSuccess };
      }
      return state;
    }),
  setSimilar: isSimilar =>
    set(state => {
      if (isSimilar !== state.isSimilar) {
        return { isSimilar };
      }
      return state;
    }),
  resetState: () => {
    set({ isAnalyze: false, isSuccess: false, isSimilar: false });
  },
}));

export default useImageSearchStore;
