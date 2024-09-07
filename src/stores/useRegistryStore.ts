import create from 'zustand';

interface ShoesRegistryStore {
  rating: number;
  length: string;
  width: string;
  height: string;
  sole: string;
  weight: string;
  recommendation: string;
  review: string;
  setRating: (value: number) => void;
  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setHeight: (value: string) => void;
  setSole: (value: string) => void;
  setWeight: (value: string) => void;
  setRecommendation: (value: string) => void;
  setReview: (value: string) => void;
}

export const useShoesRegistryStore = create<ShoesRegistryStore>(set => ({
  rating: 0,
  length: '',
  width: '',
  height: '',
  sole: '',
  weight: '',
  recommendation: '',
  review: '',
  setRating: (value: number) => set({ rating: value }),
  setLength: (value: string) => set({ length: value }),
  setWidth: (value: string) => set({ width: value }),
  setHeight: (value: string) => set({ height: value }),
  setSole: (value: string) => set({ sole: value }),
  setWeight: (value: string) => set({ weight: value }),
  setRecommendation: (value: string) => set({ recommendation: value }),
  setReview: (value: string) => set({ review: value }),
}));
