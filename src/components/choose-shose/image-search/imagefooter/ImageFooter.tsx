import { camera, gallery } from '../../../../assets/assets';
import {
  ImageFotter_IconMove,
  ImageFooter_CameraIcon,
  ImageFooter_CameraIconBackground,
  ImageFooter_GalleryIcon,
} from './imagefooter.css.ts';
import './imagefooter.css';
import AnalyzeItem from './analyzeitem/AnalyzeItem.tsx';
import useImageSearchStore from '../../../../stores/useImageSearchStore.ts';

const ImageFooter = () => {
  const { isAnalyze, handleClickCameraIcon } = useImageSearchStore();
  return (
    <>
      <div
        className={`${ImageFooter_CameraIconBackground} ${
          isAnalyze ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static
        }`}
      >
        <img className={ImageFooter_CameraIcon} src={camera} alt="camera" onClick={() => handleClickCameraIcon(true)} />
      </div>
      <div
        className={`${ImageFooter_GalleryIcon} ${isAnalyze ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static}`}
      >
        <img src={gallery} alt="gallery" />
      </div>
      <AnalyzeItem />
    </>
  );
};
export default ImageFooter;
