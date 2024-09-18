import { camera } from '../../../../assets/assets';
import {
  ImageFooter_CameraIcon,
  ImageFooter_CameraIconBackground,
  ImageFooter_GalleryIcon,
} from './imagefooter.css.ts';
import './imagefooter.css';
import AnalyzeItem from './analyzeitem/AnalyzeItem.tsx';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';
import { useMutation } from '@tanstack/react-query';
import { ImageShoseSearchAPI } from '../../../../api/searchRequests.ts';
import Gallery from '../../gallery/Gallery.tsx';
import useGalleryStore from '../../../../stores/useGalleryStore.ts';
import { useEffect } from 'react';

const ImageFooter = () => {
  const { handleCaptureImage, canvasImage, setGetData, isAnalyze, isSuccess, setIsState } = useImageSearchStore();
  const { galleryImage, setGalleryImage } = useGalleryStore();

  const handleImageSearchPost = useMutation({
    mutationFn: (data: string) => {
      const jsonData = JSON.stringify({ image: data });
      return ImageShoseSearchAPI(jsonData);
    },
    onSuccess: response => {
      console.log('키워드 전송 성공');
      const product = response.data.products[0];
      setGetData({ capturedImage: product.image, brand: product.brand, modelName: product.modelName });
      if (!isAnalyze) return;
      if (isSuccess) return;
      setIsState({ isSuccess: true });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  const handleClickCamera = () => {
    handleCaptureImage(true);
    if (canvasImage !== 'data:,') {
      handleImageSearchPost.mutate(canvasImage!);
    }
  };

  useEffect(() => {
    if (galleryImage === null) return;

    setIsState({ isAnalyze: true });
    if (canvasImage !== 'data:,') {
      handleImageSearchPost.mutate(galleryImage!);
      setGalleryImage(null);
    }
  }, [galleryImage]);

  return (
    <>
      <div className={ImageFooter_CameraIconBackground}>
        <img className={ImageFooter_CameraIcon} src={camera} alt="camera" onClick={handleClickCamera} />
      </div>
      <div className={ImageFooter_GalleryIcon}>
        <Gallery />
      </div>
      <AnalyzeItem />
    </>
  );
};
export default ImageFooter;
