import { create } from 'zustand';

type CaptureStore = {
  capturedImage: string | null;
  setCapturedImage: (capturedImage: string | null) => void;
};

const useCaptureStore = create<CaptureStore>(set => ({
  capturedImage: null,
  setCapturedImage: capturedImage => set({ capturedImage }),
}));

export default useCaptureStore;
