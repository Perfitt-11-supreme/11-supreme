import { useRef } from 'react';
import { picture, upload } from '../../../assets/assets';
import {
  chatbotSearchContainer,
  chatbotSearchInput,
  chatbotSearchInputBox,
  pictureIconBox,
  uploadIconBox,
} from './chatbotSearchInput.css';

type ChatbotSearchInputProps = {
  chatCompletionsMutation: any; // questionMutation의 타입을 정의
}

const ChatbotSearchInput = ({ chatCompletionsMutation }: ChatbotSearchInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (question: string) => {
    const trimmedQuestion = question.trim();
    if (trimmedQuestion !== '') {
      chatCompletionsMutation.mutate(trimmedQuestion);
      if (inputRef.current) {
        inputRef.current.value = ''; // 입력 필드 초기화
      }
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      handleSubmit(inputRef.current.value);
    }
  };

  return (
    <>
      <div className={chatbotSearchContainer}>
        <div className={pictureIconBox} onClick={handlePictureClick}>
          <img src={picture} alt="picture" />
        </div>
        <div className={chatbotSearchInputBox}>
          <input
            ref={inputRef}
            className={chatbotSearchInput}
            type="text"
            placeholder="궁금한 신발 정보 물어보세요!"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit((e.target as HTMLInputElement).value);
              }
            }}
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log('선택한 파일:', file);
            }
          }}
        />
      </div>
    </>
  );
};

export default ChatbotSearchInput;