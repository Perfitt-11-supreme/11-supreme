import React, { useRef } from 'react';
import useGalleryStore from '../../../stores/useGalleryStore';
import { gallery } from '../../../assets/assets';

export default function Gallery() {
  const { setGalleryImage } = useGalleryStore();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputFile = (e: React.FormEvent<HTMLInputElement>) => {
    const inputElement = e.currentTarget;

    if (inputElement.files && inputElement.files[0]) {
      setGalleryImage(inputElement.files[0].name);

      //동일한 파일을 다시 선택할 수 있도록 입력 필드 리셋
      inputElement.value = '';
    }
  };

  const handleClickGalleryImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <img src={gallery} alt="gallery" onClick={handleClickGalleryImage} />
      <input type="file" accept="image/*" ref={inputRef} onInput={handleInputFile} style={{ display: 'none' }} />
    </>
  );
}

//35vw
//20vh
