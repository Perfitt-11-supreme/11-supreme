import { useRef } from 'react';
import CameraWindow from './camera-window/CameraWindow';
import ImageFooter from './imagefooter/ImageFooter';
import useCaptureStore from '../../../stores/useCaptureStore';

const ImageSearch = () => {
  const { setCapturedImage } = useCaptureStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas: HTMLCanvasElement = canvasRef.current;
      const video: HTMLVideoElement = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
      }
    }
  };

  return (
    <>
      <CameraWindow videoRef={videoRef} />
      <ImageFooter handleCaptureImage={handleCaptureImage} />
      <canvas ref={canvasRef} style={{ position: 'fixed', bottom: '100vh' }}></canvas>
    </>
  );
};
export default ImageSearch;
