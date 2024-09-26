import CameraWindow from './camera-window/CameraWindow';
import useProductStore from '../../../stores/useProductsStore';
import { useEffect } from 'react';
import { close } from '../../../assets/assets';
import Header from '../../common/header/Header';
import AnalyzeImage from './analyzeimage/AnalyzeImage';
import useSelectItemStore from '../../../stores/useSelectItemStore';

const ImageSearch = () => {
  const { setProducts } = useProductStore();
  const { resetItem } = useSelectItemStore();
  useEffect(() => {
    setProducts([]);
    resetItem();
  }, []);

  console.log('랜더링됨');

  return (
    <>
      <Header imageSrc={close} alt="close" nav="/text-search" />
      <CameraWindow />
      <AnalyzeImage />
    </>
  );
};
export default ImageSearch;
