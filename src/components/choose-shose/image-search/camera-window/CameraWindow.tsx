import { camera, rectangle } from '../../../../assets/assets';
import {
  CameraWindow_CameraIcon,
  CameraWindow_CameraIconBackground,
  CameraWindow_Canvas,
  CameraWindow_GalleryIcon,
  CameraWindow_Rectangle,
  CameraWindow_View,
  CameraWindow_ViewContainer,
} from './camerawindow.css';
import useImageSearchStore from '../../../../stores/useImageSearchStore';
import { useEffect, useRef } from 'react';
import Gallery from '../../gallery/Gallery';
import { useMutation } from '@tanstack/react-query';
import { ImageShoseSearchAPI } from '../../../../api/searchRequests';
import useGalleryStore from '../../../../stores/useGalleryStore';

const CameraWindow = () => {
  //분석중인지 / 포스트 성공 여부 / 캔버스에 그려진 이미지 / 상태 설정 함수 / 포스트 받은 데이터 저장 함수 /
  const { isAnalyze, isSuccess, canvasImage, setIsState, setGetData, handleCaptureImage } = useImageSearchStore();
  const { galleryImage, setGalleryImage } = useGalleryStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      setIsState({ isAnalyze: false, isSuccess: true });
    },
    onError: error => {
      console.error('이미지 서칭 실패:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨');
    },
  });

  const handleClickCamera = () => {
    if (canvasRef && videoRef && canvasRef.current && videoRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const video: HTMLVideoElement = videoRef.current;
      handleCaptureImage(canvas, video);
      if (canvasImage !== 'data:,') {
        handleImageSearchPost.mutate(canvasImage!);
      }
    }
  };

  useEffect(() => {
    setIsState({ isAnalyze: false, isSuccess: false, isSimilar: false });
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera: ', err);
      }
    };

    getCameraStream();

    return () => {
      setIsState({ isAnalyze: false, isSuccess: false, isSimilar: false });
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

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
      {!isAnalyze && (
        <>
          <img className={CameraWindow_Rectangle} src={rectangle} alt="rectangle" />
          <div className={CameraWindow_CameraIconBackground}>
            <img className={CameraWindow_CameraIcon} src={camera} alt="camera" onClick={handleClickCamera} />
          </div>
          <div className={CameraWindow_GalleryIcon}>
            <Gallery />
          </div>
        </>
      )}
      <div className={CameraWindow_ViewContainer}>
        <video className={CameraWindow_View} ref={videoRef} autoPlay></video>
        <canvas className={CameraWindow_Canvas} ref={canvasRef}></canvas>
      </div>
    </>
  );
};
export default CameraWindow;
