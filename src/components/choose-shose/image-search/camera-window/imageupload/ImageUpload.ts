import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase/firebase';

export const ImageUpload = async (canvasImage: string, onSuccess: (url: string) => void, name?: string) => {
  // 이미지의 이름 겹침을 방지하기 위한 현재시간 가져오기
  const timestamp = new Date().getTime();
  const imagePath = `images/${name ? name : 'uploadImage'}_${timestamp}.png`;
  // 이미지 저장 위치
  const storageRef = ref(storage, imagePath);
  const dataURL: string = canvasImage;

  // 매개변수로 받은 base64기반 이미지를 파이어베이스에 업로드
  uploadString(storageRef, dataURL, 'data_url').then(async snapshot => {
    // 업로드 완료 후 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);

    if (downloadURL) {
      // Post 함수
      onSuccess(downloadURL);

      // 2초뒤 실행
      setTimeout(() => {
        // 이미지 삭제 함수
        const storageRef = ref(storage, imagePath);

        // 이미지 삭제
        deleteObject(storageRef)
          .then(() => {
            console.log('File deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting file:', error);
          });
      }, 2000);
    }
  });
};

// 갤러리에서 가져온 파일을 매개변수로 받아 base64형태로 바꾸는 함수
export const handleImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // FileReader를 정상적으로 가져옴
    reader.onloadend = () => {
      // FileReader에 들어온 파일을 base64로 변환
      const base64String = reader.result as string;
      // base64 문자열 반환
      resolve(base64String);
    };
    // FileReader를 가져오는 중 에러
    reader.onerror = () => {
      reject(new Error('Failed to convert image to Base64'));
    };

    // 파일 읽기
    reader.readAsDataURL(file);
  });
};

// 카메라로 촬영한 이미지 base64로 변환하는 함수
export const handleCaptureImage = (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement | null,
  onComplete: (canvasImage: string | null) => void
) => {
  if (canvas && video) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/png');
      if (imageData === 'data:,') {
        onComplete(null);
        return {};
      }

      // 캡처된 이미지를 Zustand 상태로 저장
      onComplete(imageData);
    }
  }
  return {};
};
