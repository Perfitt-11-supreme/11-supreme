import { close, rectangle } from '../../../../assets/assets';
<<<<<<< HEAD
import { CameraWindow_RectangleContainer } from './camerawindow.css';
import Header from '../../../common/header/Header';
import useImageSearchStore from '../../../../stores/useImageSearchStore';

const CameraWindow = () => {
  const { isAnalyze } = useImageSearchStore();

  return (
    <>
      <Header imageSrc={close} alt="close" nav="/text-search"></Header>
=======
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
>>>>>>> 48fcec9 (refactor-chooseshose---jobeomjun)
      {!isAnalyze && (
        <div className={CameraWindow_RectangleContainer}>
          <img src={rectangle} alt="rectangle" />
        </div>
      )}
    </>
  );
};
export default CameraWindow;
