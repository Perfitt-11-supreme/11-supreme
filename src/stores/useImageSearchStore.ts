import { create } from 'zustand';
import { RefObject } from 'react';

type ImageSearchStore = {
  videoRef: RefObject<HTMLVideoElement> | null;
  setVideoRef: (videoRef: RefObject<HTMLVideoElement>) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  setCanvasRef: (canvasRef: RefObject<HTMLCanvasElement>) => void;
<<<<<<< HEAD

  capturedImage: string | null;

=======
  isAnalyze: boolean;
  setIsAnalyze: (isAnalyze: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (isSuccess: boolean) => void;
  isSimilar: boolean;
  setIsSimilar: (isSimilar: boolean) => void;
  capturedImage: string | null;
>>>>>>> 5a409e4 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
  handleCaptureImage: () => void;
  handleClickCameraIcon: (bol: boolean) => void;
  handleClickAgain: () => void;
};

<<<<<<< HEAD
type ImageSearchStateStore = {
  isAnalyze: boolean;
  isSuccess: boolean;
  isSimilar: boolean;
};

type ImageSearchUpdateStore = {
  setIsState: (changedState: Partial<ImageSearchStateStore>) => void;
};

export const useImageSearchStore = create<ImageSearchStore & ImageSearchStateStore & ImageSearchUpdateStore>(set => ({
=======
export const useImageSearchStore = create<ImageSearchStore>(set => ({
>>>>>>> 5a409e4 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
  videoRef: null,
  setVideoRef: videoRef => set({ videoRef }),
  canvasRef: null,
  setCanvasRef: canvasRef => set({ canvasRef }),

  isAnalyze: false,
<<<<<<< HEAD
  isSuccess: false,
  isSimilar: false,
  setIsState: changedState => set(state => ({ ...state, ...changedState })),

  capturedImage: null,

=======
  setIsAnalyze: isAnalyze => set({ isAnalyze }),
  isSuccess: false,
  setIsSuccess: isSuccess => set({ isSuccess }),
  isSimilar: false,
  setIsSimilar: isSimilar => set({ isSimilar }),

  capturedImage: null,
>>>>>>> 5a409e4 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
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
<<<<<<< HEAD
      state.setIsState({ isAnalyze: bol });
=======
      state.setIsAnalyze(bol);
>>>>>>> 5a409e4 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
      return {};
    });
  },

  handleClickAgain: () => {
    set(state => {
<<<<<<< HEAD
      state.setIsState({ isAnalyze: false, isSuccess: false });
=======
      state.setIsAnalyze(false);
      state.setIsSuccess(false);
>>>>>>> 5a409e4 (refactor-choose-shose-상태관리---jobeomjun--1차 리팩토리)
      return {};
    });
  },
}));

export default useImageSearchStore;
