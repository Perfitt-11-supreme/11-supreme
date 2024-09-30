// 파이어베이스
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../../firebase/firebase';
// Zustand
import useUserStore from '../../../../stores/useUserStore';

export const ImageUpload = () => {
  const userId = useUserStore(state => state.user?.uid);

  const handleImageUpload = async (canvasImage: string, onSuccess: (url: string) => void) => {
    const timestamp = new Date().getTime();
    const imagePath = `images/${userId ? userId : 'guest'}/${timestamp}.png`;
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

        console.log(downloadURL);
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

  return handleImageUpload;
};
