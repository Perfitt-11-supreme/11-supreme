import { useNavigate } from 'react-router-dom';
import useSelectItemStore from '../../../../stores/useSelectItemStore';
import { ImageUpload } from '../../firebase/imageupload/ImageUpload';
import useImageSearchPost from './useImaeSearchPost';

export const useImageSearchHooks = () => {
  const { selectProduct, setSelectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const handleImageSearchPost = useImageSearchPost();
  const { handleImageUpload } = ImageUpload();
  const navigate = useNavigate();

  const handleImageSearchNavigate = (bol: boolean) => {
    setIsSelected(null);
    setSelectComplet(true);
    if (bol && selectProduct) {
      navigate('/shoes-registry');
    } else if (!bol) {
      setSelectProduct(selectProduct);
      navigate('/shoes-registry');
    }
  };

  // 카메라로 촬영한 이미지 base64로 변환하는 함수
  const handleCaptureImage = (canvas: HTMLCanvasElement | null, video: HTMLVideoElement | null) => {
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        if (dataUrl === 'data:,') {
          onComplete(null);
          return {};
        }

        // 캡처된 이미지를 Zustand 상태로 저장
        onComplete(dataUrl);
      }
    }
    return {};
  };

  const onComplete = (dataURL: string | null) => {
    // handleCaptureImage 에서 나온 base64기반 이미지로 ImageUplad 실행
    if (dataURL && dataURL !== 'data:,') {
      handleImageUpload(dataURL, downloadURL => {
        handleImageSearchPost.mutate(downloadURL);
      });
    }
  };

  return { handleImageSearchNavigate, handleCaptureImage };
};
