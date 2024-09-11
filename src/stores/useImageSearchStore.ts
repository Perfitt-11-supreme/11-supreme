import { create } from 'zustand';
import { RefObject } from 'react';

type ImageSearchStore = {
  videoRef: RefObject<HTMLVideoElement> | null;
  setVideoRef: (videoRef: RefObject<HTMLVideoElement>) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;

  capturedImage: string | null;

  handleCaptureImage: () => void;
  handleClickCameraIcon: (bol: boolean) => void;
  handleClickAgain: () => void;
};

type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
};

type ImageSearchUpdateStore = {
  setIsState: (changedState: Partial<ImageSearchStateStore>) => void;
};

export const useImageSearchStore = create<ImageSearchStore & ImageSearchStateStore & ImageSearchUpdateStore>(set => ({
  videoRef: null,
  setVideoRef: videoRef => set({ videoRef }),
  canvasRef: null,
  setCanvasRef: canvasRef => set({ canvasRef }),

  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),

  capturedImage: null,

  handleCaptureImage: () => {
    set(state => {
      if (state.videoRef!.current && state.canvasRef!.current) {
        const canvas: HTMLCanvasElement = state.canvasRef!.current;
        const video: HTMLVideoElement = state.videoRef!.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL('image/png');

          // 캡처된 이미지를 Zustand 상태로 저장
          return { capturedImage: imageData };
        }
      }
      return {};
    });
  },

  handleClickCameraIcon: (bol: boolean) => {
    set(state => {
      state.handleCaptureImage();
      state.setIsState({ isAnalyze: bol });
      return {};
    });
  },

  handleClickAgain: () => {
    set(state => {
      state.setIsState({ isAnalyze: false, isSuccess: false });
      return {};
    });
  },
}));

export default useImageSearchStore;
