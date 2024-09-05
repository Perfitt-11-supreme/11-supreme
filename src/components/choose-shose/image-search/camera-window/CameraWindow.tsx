import { close } from '../../../../assets/assets';
import { CameraWindow_CloseIcon, CameraWindow_Container } from './camerawindow.css';

const CameraWindow = () => {
  return (
    <>
      <div className={CameraWindow_Container}></div>
      <img className={CameraWindow_CloseIcon} src={close} alt="" />
    </>
  );
};
export default CameraWindow;
