import { useNavigate } from 'react-router-dom';
import { close, rectangle } from '../../../../assets/assets';
import CameraComponent from './cameracomponent/CameraComponent';
import { CameraWindow_CloseIcon, CameraWindow_RectangleContainer } from './camerawindow.css';

const CameraWindow = ({
  isAnalyze,
  videoRef,
}: {
  isAnalyze: boolean;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/textSearch');
  };

  return (
    <>
      <CameraComponent isAnalyze={isAnalyze} videoRef={videoRef} />
      {!isAnalyze && (
        <div className={CameraWindow_RectangleContainer}>
          <img src={rectangle} alt="rectangle" />
        </div>
      )}
      <img className={CameraWindow_CloseIcon} src={close} alt="close" onClick={handleNavigation} />
    </>
  );
};
export default CameraWindow;
