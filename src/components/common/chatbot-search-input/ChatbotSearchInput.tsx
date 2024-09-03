import { picture, upload } from '../../../assets/assets.css';
import {
  chatbotSearchContainer,
  chatbotSearchInput,
  chatbotSearchInputBox,
  hiddenFileInput,
  pictureIconBox,
  uploadIconBox,
} from './chatbotSearchInput.css';

const ChatbotSearchInput = () => {
  return (
    <>
      <div className={chatbotSearchContainer}>
        {/* label을 사용하여 이미지를 클릭하면 파일 첨부 창이 열리도록 함 */}
        <label className={pictureIconBox}>
          <img src={picture} alt="picture" />
          {/* 숨겨진 파일 입력 필드 */}
          <input type="file" className={hiddenFileInput} />
        </label>
        <div className={chatbotSearchInputBox}>
          <input
            className={chatbotSearchInput}
            type="text"
            placeholder="궁금한 신발 정보 물어보세요!"
          />
          <div className={uploadIconBox}>
            <img src={upload} alt="upload" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotSearchInput;
