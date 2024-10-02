import Resizer from 'react-image-file-resizer';

export const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 800, quality: number = 100): Promise<string> => {
  return new Promise((resolve, reject) => {
    // 원본 이미지 크기 확인
    const img = new Image();
    img.onload = () => {
      const originalWidth = img.width;
      const originalHeight = img.height;

      // 원본 이미지가 이미 maxWidth와 maxHeight보다 작은 경우
      if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
        // 원본 이미지를 그대로 반환
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        // 리사이징 필요한 경우
        Resizer.imageFileResizer(
          file,
          maxWidth,
          maxHeight,
          'WEBP',
          quality,
          0,
          (uri) => {
            // console.log('Resized image URI:', uri);
            resolve(uri as string);
          },
          'base64'
        );
      }
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};