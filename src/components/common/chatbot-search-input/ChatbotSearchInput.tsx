import React, { useRef, useState } from 'react';
import { picture, upload } from '../../../assets/assets';
import {
  chatbotSearchContainer,
  chatbotSearchInput,
  chatbotSearchInputBox,
  pictureIconBox,
  previewImageContainer,
  uploadIconBox,
} from './chatbotSearchInput.css';

type ChatbotSearchInputProps = {
  chatCompletionsMutation: any;
  onImageUpload?: (file: File) => void;
}

const ChatbotSearchInput: React.FC<ChatbotSearchInputProps> = ({ chatCompletionsMutation, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handlePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onImageUpload?.(selectedFile);
    } else if (inputRef.current) {
      const question = inputRef.current.value.trim();
      if (question !== '') {
        chatCompletionsMutation.mutate(question);
      }
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !selectedFile) {
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={chatbotSearchContainer}>
      <div className={pictureIconBox} onClick={handlePictureClick}>
        <img src={picture} alt="picture" />
      </div>
      <div className={chatbotSearchInputBox}>
        {previewImage && (
          <div className={previewImageContainer}>
            <img
              src={previewImage}
              alt="Preview"
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                marginRight: '5px'
              }}
            />
            <button
              onClick={handleRemoveImage}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ×
            </button>
          </div>
        )}
        <input
          ref={inputRef}
          className={chatbotSearchInput}
          type="text"
          placeholder={selectedFile ? "이미지가 첨부되었습니다" : "궁금한 신발 정보 물어보세요!"}
          style={{ paddingLeft: previewImage ? '80px' : '10px' }}
          onKeyDown={handleKeyDown}
          disabled={selectedFile !== null}
        />
        <button className={uploadIconBox} onClick={handleButtonClick}>
          <img src={upload} alt="upload" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ChatbotSearchInput;
