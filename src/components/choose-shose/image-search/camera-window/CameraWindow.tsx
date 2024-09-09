import { useNavigate } from 'react-router-dom';
import { close, rectangle } from '../../../../assets/assets';
import { CameraWindow_CloseIcon, CameraWindow_RectangleContainer } from './camerawindow.css';
import useAnalyzeStore from '../../../../stores/useAnalyzeStore';

const CameraWindow = () => {
  const { isAnalyze, setIsAnalyze } = useAnalyzeStore();
  const navigate = useNavigate();

  const handleNavigation = () => {
    setIsAnalyze(false);
    navigate('/textSearch');
  };

  return (
    <>
      <img className={CameraWindow_CloseIcon} src={close} alt="close" onClick={handleNavigation} />
      {!isAnalyze && (
        <div className={CameraWindow_RectangleContainer}>
          <img src={rectangle} alt="rectangle" />
        </div>
      )}
    </>
  );
};
export default CameraWindow;
