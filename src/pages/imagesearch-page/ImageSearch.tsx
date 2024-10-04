// 아이콘
import { close } from '../../assets/assets';
// 컴포넌트
import Header from '../../components/common/header/Header';
import AnalyzeImage from '../../components/shose-search/image-search/analyzeimage/AnalyzeImage';
import CameraWindow from '../../components/shose-search/image-search/camera-window/CameraWindow';

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
