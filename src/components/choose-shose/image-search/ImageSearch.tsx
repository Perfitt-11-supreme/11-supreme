import CameraWindow from './camera-window/CameraWindow';
import ImageFooter from './imagefooter/ImageFooter';
import CameraView from './cameraview/CameraView';
import useProductStore from '../../../stores/useProductsStore';
import { useEffect } from 'react';
import { responsiveBox } from '../../../styles/responsive.css';

const ImageSearch = () => {
  const { setProducts } = useProductStore();
  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <>
      <div className={responsiveBox}>
        <CameraView />
        <CameraWindow />
        <ImageFooter />
      </div>
    </>
  );
};
export default ImageSearch;
