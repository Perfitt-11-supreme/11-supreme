import { create } from 'zustand';

type GalleryStore = {
  galleryImage: File | null;
  setGalleryImage: (galleryImage: File | null) => void;
};

const useGalleryStore = create<GalleryStore>(set => ({
  galleryImage: null,
  setGalleryImage: (galleryImage: File | null) => set({ galleryImage }),
}));

export default useGalleryStore;
