import { create } from 'zustand';

type ImageSearchStore = {
  canvasImage: string | null;

  handleCaptureImage: (canvas: HTMLCanvasElement | null, video: HTMLVideoElement | null) => void;
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

  canvasImage: null,

  capturedImage: null,
  brand: null,
  modelName: null,
  setGetData: getData => set(state => ({ ...state, ...getData })),

  handleCaptureImage: (canvas: HTMLCanvasElement | null, video: HTMLVideoElement | null) => {
    set(state => {
      if (canvas && video) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL('image/png');
          if (imageData === 'data:,') {
            return {};
          }
          state.setIsState({ isAnalyze: true });

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
