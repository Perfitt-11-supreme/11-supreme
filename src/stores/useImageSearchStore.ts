import { create } from 'zustand';
import { RefObject } from 'react';

type ImageSearchStore = {
  videoRef: RefObject<HTMLVideoElement> | null;
  setVideoRef: (videoRef: RefObject<HTMLVideoElement>) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;
  isAnalyze: boolean;
  setIsAnalyze: (isAnalyze: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
  isSimilar: boolean;
  setIsSimilar: (isSimilar: boolean) => void;
  capturedImage: string | null;
  handleCaptureImage: () => void;
  handleClickCameraIcon: (bol: boolean) => void;
  handleClickAgain: () => void;
};

export const useImageSearchStore = create<ImageSearchStore>(set => ({
  videoRef: null,
  setVideoRef: videoRef => set({ videoRef }),
  canvasRef: null,
  setCanvasRef: canvasRef => set({ canvasRef }),

  isAnalyze: false,
  setIsAnalyze: isAnalyze => set({ isAnalyze }),
  isSuccess: false,
  setIsSuccess: isSuccess => set({ isSuccess }),
  isSimilar: false,
  setIsSimilar: isSimilar => set({ isSimilar }),

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
      state.setIsAnalyze(bol);
      return {};
    });
  },

  handleClickAgain: () => {
    set(state => {
      state.setIsAnalyze(false);
      state.setIsSuccess(false);
      return {};
    });
  },
}));

export default useImageSearchStore;
