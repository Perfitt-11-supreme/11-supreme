import { close, rectangle } from '../../../../assets/assets';
import { CameraWindow_RectangleContainer } from './camerawindow.css';
import useAnalyzeStore from '../../../../stores/useAnalyzeStore';
import Header from '../../../common/header/Header';
import { useEffect } from 'react';

const CameraWindow = () => {
  const { isAnalyze, setIsAnalyze } = useAnalyzeStore();

  useEffect(() => {
    setIsAnalyze(false);
  }, []);

  return (
    <>
      <Header imageSrc={close} alt="close" nav="/text-search"></Header>
      {!isAnalyze && (
        <div className={CameraWindow_RectangleContainer}>
          <img src={rectangle} alt="rectangle" />
        </div>
      )}
    </>
  );
};
export default CameraWindow;
