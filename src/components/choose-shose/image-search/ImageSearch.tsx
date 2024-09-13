import CameraWindow from './camera-window/CameraWindow';
import ImageFooter from './imagefooter/ImageFooter';
import CameraView from './cameraview/CameraView';
import useProductStore from '../../../stores/useProductsStore';
import { useEffect } from 'react';

const ImageSearch = () => {
  const { setProducts } = useProductStore();
  useEffect(() => {
    setProducts([]);
  }, []);

  return (
    <>
      <CameraView />
      <CameraWindow />
      <ImageFooter />
    </>
  );
};
export default ImageSearch;
