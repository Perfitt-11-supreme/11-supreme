import { create } from 'zustand';

type GalleryStore = {
  galleryImage: string | null;
  setGalleryImage: (galleryImage: string | null) => void;
};

const useGalleryStore = create<GalleryStore>(set => ({
  galleryImage: null,
  setGalleryImage: (galleryImage: string | null) => set({ galleryImage }),
}));

export default useGalleryStore;
