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

const ImageFooter = ({ setIsAnalyze }: { setIsAnalyze: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isClickIcon, setIsClickIcon] = useState(false);

  const handleClickIcon = (bol: boolean) => {
    setIsClickIcon(bol);
    setIsAnalyze(bol);
  };

  return (
    <>
      <div
        className={`${ImageFooter_CameraIconBackground} ${
          isClickIcon ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static
        }`}
      >
        <img className={ImageFooter_CameraIcon} src={camera} alt="camera" onClick={() => handleClickIcon(true)} />
      </div>
      <div
        className={`${ImageFooter_GalleryIcon} ${
          isClickIcon ? ImageFotter_IconMove.moved : ImageFotter_IconMove.static
        }`}
      >
        <img src={gallery} alt="gallery" />
      </div>
      <AnalyzeItem isClickIcon={isClickIcon} handleClickIcon={handleClickIcon} />
    </>
  );
};
export default ImageFooter;
