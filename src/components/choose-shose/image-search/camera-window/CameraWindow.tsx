// 아이콘 / css
import { camera, rectangle } from '../../../../assets/assets';
import {
  CameraWindow_CameraIcon,
  CameraWindow_CameraIconBackground,
  CameraWindow_GalleryIcon,
  CameraWindow_Icons,
  CameraWindow_Rectangle,
  CameraWindow_View,
  CameraWindow_ViewContainer,
} from './camerawindow.css';
import { useEffect, useRef } from 'react';
// ZuStand
import useImageSearchStore from '../../../../stores/useImageSearchStore';
import useGalleryStore from '../../../../stores/useGalleryStore';
import useSelectItemStore from '../../../../stores/useSelectItemStore';
import useProductStore from '../../../../stores/useProductsStore';
// 커스텀 훅
import { useImageSearchHooks } from '../hooks/useImageSearchHooks';
// 컴포넌트
import Gallery from '../../gallery/Gallery';

const CameraWindow = () => {
  //분석중인지 / 포스트 성공 여부 / 캔버스에 그려진 이미지 / 상태 설정 함수 / 포스트 받은 데이터 저장 함수 /
  const { isAnalyze, isSuccess, isSimilar, setAnalyze, resetState } = useImageSearchStore();
  const { setProducts } = useProductStore();
  const { resetItem } = useSelectItemStore();
  const { galleryImage } = useGalleryStore();
  const { handleCaptureImage, handleImageToBase64 } = useImageSearchHooks();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleClickCamera = () => {
    if (videoRef && videoRef.current) {
      const video: HTMLVideoElement = videoRef.current;

      if (video.readyState >= 2) {
        // READY_STATE_HAVE_ENOUGH_DATA
        setAnalyze(true);
        // 찍은 사진을 base64로 변환하는 함수
        handleCaptureImage(video);
      } else {
        console.warn('Video is not ready yet.');
      }
    }
  };

  useEffect(() => {
    resetState();
    // 카메라가 있고 접근이 된다면 videoRef에 연결
    const getCameraStream = async () => {
      setProducts([]);
      resetItem();
      try {
        // 카메라가 있다면
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera: ', err);
        alert('카메라 접근에 실패했습니다. 권한을 확인하세요.');
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
      {!isAnalyze && !isSuccess && !isSimilar && (
        <div>
          <img className={CameraWindow_Rectangle} src={rectangle} alt="rectangle" />
          <div className={CameraWindow_Icons}>
            <div className={CameraWindow_CameraIconBackground} onClick={handleClickCamera}>
              <img className={CameraWindow_CameraIcon} src={camera} alt="camera" />
            </div>
            <div className={CameraWindow_GalleryIcon}>
              <Gallery />
            </div>
          </div>
        </div>
      )}
      <div className={CameraWindow_ViewContainer}>
        <video className={CameraWindow_View} ref={videoRef} autoPlay></video>
      </div>
    </>
  );
};
export default CameraWindow;
