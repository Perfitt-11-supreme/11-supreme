import { create } from 'zustand';

type CaptureStore = {
  capturedImage: string | null;
  setCapturedImage: (capturedImage: string) => void;
  handleCaptureImage: () => void;
  handleClickCameraIcon: (bol: boolean) => void;
  handleClickAgain: () => void;
};

const useCaptureStore = create<CaptureStore>(set => ({
  capturedImage: null,
  setCapturedImage: capturedImage => set({ capturedImage }),
  handleCaptureImage: () => {},
  handleClickCameraIcon: () => {},
  handleClickAgain: () => {},
}));

export default useCaptureStore;
