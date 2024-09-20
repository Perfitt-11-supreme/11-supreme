import { create } from 'zustand';

type ImageSearchStore = {
  handleClickAgain: () => void;
};

type ImageSerachGetData = {
  capturedImage: string | null;
  brand: string | null;
  modelName: string | null;
  setGetData: (getData: Partial<ImageSerachGetData>) => void;
};

type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
  setIsState: (changedState: Partial<ImageSearchStateStore>) => void;
};

const useImageSearchStore = create<ImageSearchStore & ImageSerachGetData & ImageSearchStateStore>(set => ({
  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  isGallery: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),

  capturedImage: null,
  brand: null,
  modelName: null,
  setGetData: getData => set(state => ({ ...state, ...getData })),

  handleClickAgain: () => {
    set(state => {
      state.setIsState({ isAnalyze: false, isSuccess: false });
      return {};
    });
  },
}));

export default useImageSearchStore;
