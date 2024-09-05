import { useState } from 'react';
import { camera, gallery } from '../../../../assets/assets';
import {
  ImageFotter_IconMove,
  ImageFooter_CameraIcon,
  ImageFooter_CameraIconBackground,
  ImageFooter_GalleryIcon,
} from './imagefooter.css.ts';
import './imagefooter.css';
import AnalyzeItem from './analyzeitem/AnalyzeItem.tsx';

const ImageFooter = () => {
  const [isClickIcon, setIsClickIcon] = useState(false);

  const handleClickIcon = () => {
    setIsClickIcon(true);
  };

  return (
    <>
      <div
        className={`${ImageFooter_CameraIconBackground} ${
          isClickIcon ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static
        }`}
      >
        <img className={ImageFooter_CameraIcon} src={camera} alt="camera" onClick={handleClickIcon} />
      </div>
      <div
        className={`${ImageFooter_GalleryIcon} ${
          isClickIcon ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static
        }`}
      >
        <img src={gallery} alt="gallery" />
      </div>
      <AnalyzeItem isClickIcon={isClickIcon} />
    </>
  );
};
export default ImageFooter;
