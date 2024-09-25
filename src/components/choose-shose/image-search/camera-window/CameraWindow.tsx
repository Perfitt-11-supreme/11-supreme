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
import useGalleryStore from '../../../../stores/useGalleryStore';
import { useImageSearchHooks } from '../hooks/useImageSearchHooks';
import { ImageUpload } from '../../firebase/imageupload/ImageUpload';

const CameraWindow = () => {
  //분석중인지 / 포스트 성공 여부 / 캔버스에 그려진 이미지 / 상태 설정 함수 / 포스트 받은 데이터 저장 함수 /
  const { isAnalyze, setAnalyze, resetState } = useImageSearchStore();
  const { galleryImage } = useGalleryStore();
  const { handleCaptureImage } = useImageSearchHooks();
  const { handleImageToBase64 } = ImageUpload();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClickCamera = () => {
    if (canvasRef && videoRef && canvasRef.current && videoRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const video: HTMLVideoElement = videoRef.current;

      setAnalyze(true);
      // 찍은 사진을 base64로 변환하는 함수
      handleCaptureImage(canvas, video);
    }
  };

  useEffect(() => {
    resetState();
    // 카메라가 있고 접근이 된다면 videoRef에 연결
    const getCameraStream = async () => {
      try {
        // 카메라가 있다면
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
      resetState();
      if (videoRef.current && videoRef.current.srcObject) {
        // videoRef에 연결된 카메라
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        // 카메라 연결 해제
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (galleryImage === null) return;

    setAnalyze(true);
    // 갤러리 사진 고르면 이미지 데이타로 변경해서 전달해주고 imageupload진행하기
    if (galleryImage) {
      // 갤러리에서 고른 이미지를 base64로 변환
      handleImageToBase64(galleryImage);
    }
  }, [galleryImage]);

  return (
    <>
      {!isAnalyze && (
        <>
          <img className={CameraWindow_Rectangle} src={rectangle} alt="rectangle" />
          <div className={CameraWindow_CameraIconBackground} onClick={handleClickCamera}>
            <img className={CameraWindow_CameraIcon} src={camera} alt="camera" />
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
