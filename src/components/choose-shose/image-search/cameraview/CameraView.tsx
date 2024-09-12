import { useEffect, useRef } from 'react';
import { CameraComponent_Canvas, CameraComponent_Container, CameraComponent_View } from './cameraview.css';
import useImageSearchStore from '../../../../stores/useImageSearchStore';

const CameraView = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setVideoRef, setCanvasRef } = useImageSearchStore();

  useEffect(() => {
    setVideoRef(videoRef);
    setCanvasRef(canvasRef);
  }, [setVideoRef, setCanvasRef]);

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
      <canvas className={CameraComponent_Canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default CameraView;
