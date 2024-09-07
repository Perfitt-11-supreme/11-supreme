import { useEffect } from 'react';
import { CameraComponent_Container, CameraComponent_View } from './cameracomponent.css';

const CameraComponent = ({
  isAnalyze,
  videoRef,
}: {
  isAnalyze: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}) => {
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

    console.log(isAnalyze);

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
    </div>
  );
};

export default CameraComponent;
