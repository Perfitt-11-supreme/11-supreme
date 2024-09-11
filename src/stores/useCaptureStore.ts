import { create } from 'zustand';

type CaptureStore = {
  capturedImage: string | null;
<<<<<<< HEAD
  setCapturedImage: (capturedImage: string) => void;
  handleCaptureImage: () => void;
  handleClickCameraIcon: (bol: boolean) => void;
  handleClickAgain: (bol: boolean) => void;
=======
  setCapturedImage: (capturedImage: string | null) => void;
>>>>>>> be29a76 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
};

const useCaptureStore = create<CaptureStore>(set => ({
  capturedImage: null,
  setCapturedImage: capturedImage => set({ capturedImage }),
<<<<<<< HEAD
  handleCaptureImage: () => {},
  handleClickCameraIcon: () => {},
  handleClickAgain: () => {},
=======
>>>>>>> be29a76 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
}));

export default useCaptureStore;
