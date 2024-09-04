import { picture, upload } from '../../../assets/assets';
import {
  chatbotSearchInput,
  chatbotSearchInputBox,
  chatbotSearchContainer,
  pictureIconBox,
  uploadIconBox,
} from './chatbotSearchInput.css';

const ChatbotSearchInput = () => {
  return (
    <>
      <div className={chatbotSearchContainer}>
        <div className={pictureIconBox}>
          <img src={picture} alt="picture" />
        </div>
        <div className={chatbotSearchInputBox}>
          <input className={chatbotSearchInput} type="text" placeholder="궁금한 신발 정보 물어보세요!" />
          <div className={uploadIconBox}>
            <img src={upload} alt="upload" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotSearchInput;
