import CameraWindow from './camera-window/CameraWindow';
import useProductStore from '../../../stores/useProductsStore';
import { useEffect } from 'react';
import { responsiveBox } from '../../../styles/responsive.css';
import { close } from '../../../assets/assets';
import Header from '../../common/header/Header';
import AnalyzeItem from './analyzeitem/AnalyzeItem';

const ImageSearch = () => {
  const { setProducts } = useProductStore();
  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <>
      <div className={responsiveBox}>
        <Header imageSrc={close} alt="close" nav="/text-search" />
        <CameraWindow />
        <AnalyzeItem />
      </div>
    </>
  );
};
export default ImageSearch;
