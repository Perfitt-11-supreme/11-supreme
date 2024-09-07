import { create } from 'zustand';

type AnalyzeStore = {
  isAnalyze: boolean;
  setIsAnalyze: (isAnalyze: boolean) => void;
};

const useAnalyzeStore = create<AnalyzeStore>(set => ({
  isAnalyze: false,
  setIsAnalyze: isAnalyze => set({ isAnalyze }),
}));

export default useAnalyzeStore;
