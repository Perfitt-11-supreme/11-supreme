import { useEffect, useRef } from 'react';
import { CameraComponent_Container, CameraComponent_View } from './cameraview.css';
import useCaptureStore from '../../../../stores/useCaptureStore';

const CameraView = () => {
  const { setCapturedImage } = useCaptureStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const captureImage = () => {
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

  useEffect(() => {
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
    useCaptureStore.setState({ handleCaptureImage: captureImage });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className={CameraComponent_Container}>
      <video className={CameraComponent_View} ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef} style={{ position: 'fixed', bottom: '100vh' }}></canvas>
    </div>
  );
};

export default CameraView;
