import { close, rectangle } from '../../../../assets/assets';
import { CameraWindow_RectangleContainer } from './camerawindow.css';
import Header from '../../../common/header/Header';
import useImageSearchStore from '../../../../stores/useImageSearchStore';
import { useEffect } from 'react';

const CameraWindow = () => {
  const { isAnalyze, setIsState } = useImageSearchStore();

  useEffect(() => {
    setIsState({ isAnalyze: false, isSuccess: false, isSimilar: false });
    return setIsState({ isAnalyze: false, isSuccess: false, isSimilar: false });
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
