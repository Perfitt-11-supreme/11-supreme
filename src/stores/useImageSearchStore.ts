import { create } from 'zustand';
import { RefObject } from 'react';

type ImageSearchStore = {
  videoRef: RefObject<HTMLVideoElement> | null;
  setVideoRef: (videoRef: RefObject<HTMLVideoElement>) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;

  canvasImage: string | null;

  handleCaptureImage: (bol: boolean) => void;
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
  videoRef: null,
  setVideoRef: videoRef => set({ videoRef }),
  canvasRef: null,
  setCanvasRef: canvasRef => set({ canvasRef }),

  isAnalyze: false,
  isSuccess: false,
  isSimilar: false,
  isGallery: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),

  canvasImage: null,

  capturedImage: null,
  brand: null,
  modelName: null,
  setGetData: getData => set(state => ({ ...state, ...getData })),

  handleCaptureImage: (bol: boolean) => {
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
          if (imageData === 'data:,') {
            return {};
          }
          state.setIsState({ isAnalyze: bol });

          // 캡처된 이미지를 Zustand 상태로 저장
          return { canvasImage: imageData };
        }
      }
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
