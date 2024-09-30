// 리액트
import { useNavigate } from 'react-router-dom';
// Zustand
import useSelectItemStore from '../../../../stores/useSelectItemStore';
import useGalleryStore from '../../../../stores/useGalleryStore';
// 파이어베이스
import { ImageUpload } from '../../firebase/imageupload/ImageUpload';
// 커스텀 훅
import useImageSearchPost from './useImaeSearchPost';

export const useImageSearchHooks = () => {
  const { selectProduct, setSelectProduct, setIsSelected, setSelectComplet } = useSelectItemStore();
  const handleImageSearchPost = useImageSearchPost();
  const handleImageUpload = ImageUpload();
  const { setGalleryImage } = useGalleryStore();
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

  // 비디오나 입력받은 이미지를 canvas에 그린후 base64를 기반으로 URL을 return
  const drawToCanvas = (source: HTMLVideoElement | HTMLImageElement, width: number): string | null => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const aspectRatio =
      source instanceof HTMLVideoElement ? source.videoHeight / source.videoWidth : source.height / source.width;

    const height = width * aspectRatio;

    //캔버스 크기 설정
    canvas.width = width;
    canvas.height = height;
    if (ctx) {
      ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/jpeg', 0.8);
    }
    return null;
  };

  // 카메라로 촬영한 이미지 base64로 변환하는 함수
  const handleCaptureImage = (video: HTMLVideoElement) => {
    if (video) {
      // 원하는 고정 너비 설정
      const desiredWidth = 320;

      const dataUrl = drawToCanvas(video, desiredWidth);
      if (dataUrl) {
        // 캡처된 이미지를  변환한 bsae64로 firebase에 업로드이후 API 포스트
        handleImageUpload(dataUrl, downloadURL => {
          handleImageSearchPost.mutate(downloadURL);
        });
      }
    }
  };

  // base64로 변환된 이미지를 파이어스토어에 업로드하고 해당 이미지Url을 가져와API에 포스트
  const handleImageToBase64 = (file: File) => {
    imageToBase64(file).then(dataURL =>
      // base64로 변환한 이미지로 ImageUpload 실행
      handleImageUpload(dataURL, downloadURL => {
        handleImageSearchPost.mutate(downloadURL);
      })
    );
  };

  // 캡쳐된 이미지를 base64로 변환해 handleImageToBase64로 전달
  const imageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // FileReader를 정상적으로 가져옴
      reader.onloadend = () => {
        // 입력 받은 이미지의 사이즈를 줄이기 위한 이미지 선언
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          // 원하는 고정 너비 설정
          const desiredWidth = 640;
          const dataUrl = drawToCanvas(img, desiredWidth);

          if (dataUrl) {
            resolve(dataUrl);
            // 갤러리 이미지 지우기
            setGalleryImage(null);
          } else {
            reject(new Error('Failed to get canvas context'));
          }
        };
      };
      // FileReader를 가져오는 중 에러
      reader.onerror = () => {
        reject(new Error('Failed to convert image to Base64'));
      };
      // 파일 읽기
      reader.readAsDataURL(file);
    });
  };

  return { handleImageSearchNavigate, handleCaptureImage, handleImageToBase64 };
};
