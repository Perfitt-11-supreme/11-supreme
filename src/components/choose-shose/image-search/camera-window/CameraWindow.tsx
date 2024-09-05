import { close, rectangle } from '../../../../assets/assets';
import { CameraWindow_CloseIcon, CameraWindow_Container } from './camerawindow.css';

const CameraWindow = ({ isAnalyze }: { isAnalyze: boolean }) => {
  return (
    <>
      <div className={CameraWindow_Container}>{!isAnalyze && <img src={rectangle} alt="rectangle" />}</div>
      <img className={CameraWindow_CloseIcon} src={close} alt="" />
    </>
  );
};
export default CameraWindow;
