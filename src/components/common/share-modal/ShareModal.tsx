import { useState } from "react";
import { chatCircle, copy_left, link_angled, loading } from "../../../assets/assets";
import { copyingButton, shareContainer, shareContentsBox, shareContentsTitle, shareDate, shareDescription, shareModalButton, shareTextWrap, shareTitle, shareWrap } from "./shareModal.css";

const ShareModal = () => {
  const [copyStatus, setCopyStatus] = useState<'default' | 'copying' | 'copied'>('default');

  const handleCopyClick = async () => {
    setCopyStatus('copying'); // 복사 중 상태
    try {
      await navigator.clipboard.writeText(window.location.href); // URL 복사
      setTimeout(() => setCopyStatus('copied'), 500); // 0.5초 후 복사 완료로 변경
    } catch (err) {
      console.error('URL 복사 실패:', err);
      setCopyStatus('default'); // 실패 시 원래 상태로
    }
  };

  const renderButtonText = () => {
    if (copyStatus === 'copying') return '링크 복사 중';
    if (copyStatus === 'copied') return '복사 됨';
    return '링크 복사';
  };

  const renderButtonImage = () => {
    if (copyStatus === 'copying') return loading; // 복사 중 아이콘
    if (copyStatus === 'copied') return copy_left;  // 복사 완료 아이콘
    return link_angled; // 기본 아이콘
  };

  return (
    <div className={shareWrap}>
      <div className={shareContainer}>
        <div className={shareTextWrap}>
          <p className={shareTitle}>공개 링크 생성됨</p>
          <p className={shareDescription}>채팅의 공개 링크가 생성되었습니다. 공유를 원하는 곳에 어디든지 전달하실 수 있습니다.</p>
        </div>
        <div className={shareContentsBox}>
          <div>
            <img src={chatCircle} />
          </div>
          <p className={shareContentsTitle}>비오는 날 신기 좋은 레인부츠 추천</p>
          <p className={shareDate}>2024년 10월 30일</p>
        </div>
        <button
          className={copyStatus === 'default' ? shareModalButton : copyingButton}
          onClick={handleCopyClick}
        >
          <img src={renderButtonImage()} alt="link" />
          {renderButtonText()}
        </button>
      </div>
    </div >
  );
}
export default ShareModal