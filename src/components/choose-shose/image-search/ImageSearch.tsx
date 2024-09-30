// 아이콘
import { close } from '../../../assets/assets';
// 컴포넌트
import CameraWindow from './camera-window/CameraWindow';
import Header from '../../common/header/Header';
import AnalyzeImage from './analyzeimage/AnalyzeImage';

const ImageSearch = () => {
  return (
    <>
      <Header imageSrc={close} alt="close" nav="/text-search" />
      <CameraWindow />
      <AnalyzeImage />
    </>
  );
};
export default ImageSearch;
