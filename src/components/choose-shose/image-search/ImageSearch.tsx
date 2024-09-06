import { useState } from 'react';
import CameraWindow from './camera-window/CameraWindow';
import ImageFooter from './imagefooter/ImageFooter';

const ImageSearch = () => {
  const [isAnalyze, setIsAnalyze] = useState(false);
  return (
    <>
      <CameraWindow isAnalyze={isAnalyze} />
      <ImageFooter setIsAnalyze={setIsAnalyze} />
    </>
  );
};
export default ImageSearch;
