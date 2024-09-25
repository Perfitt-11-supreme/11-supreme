import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sidemenu_delete, sidemenu_linkshare } from '../../assets/assets';
import useChatStore from '../../stores/useChatStore';
import useModalStore from '../../stores/useModalStore';
import useUserStore from '../../stores/useUserStore';
import { fetchShareId } from '../../utils/sharedChatHistoryUtils';
import {
  sidemenuDeleteIconBox,
  sidemenuLinkShareIconBox,
  sidemenuListBox,
  sidemenuListContainer,
  sidemenuListIcon,
  sidemenuListText,
  sidemenuSwiperHiddenBox,
} from './sidemenuList.css';

type SidemenuListProps = {
  iconSrc: string;
  keywords: string;
  timestamp: string;
  id: string;
  shareId: string;
  handleDelete: (id: string) => void;
  onClose: () => void;
};

const SideMenuList = ({ iconSrc, keywords, id, shareId, handleDelete, onClose }: SidemenuListProps) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const startX = useRef<number | null>(null);
  const threshold = 50; // 스와이프 임계값
  const { setIsShareModalOpen, setShareModalId } = useModalStore();
  const { user } = useUserStore()
  const { setCurrentChatId } = useChatStore()
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current !== null) {
      const moveX = e.touches[0].clientX - startX.current;
      if (moveX < -threshold) {
        setIsSwiped(true); // 왼쪽으로 스와이프
      } else if (moveX > threshold) {
        setIsSwiped(false); // 오른쪽으로 스와이프
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startX.current !== null) {
      const moveX = e.clientX - startX.current;
      if (moveX < -threshold) {
        setIsSwiped(true); // 왼쪽으로 스와이프
      } else if (moveX > threshold) {
        setIsSwiped(false); // 오른쪽으로 스와이프
      }
    }
  };

  const handleMouseUp = () => {
    startX.current = null; // 스와이프 동작 종료
  };

  const handleOpenShareModal = async () => {
    if (shareId) {
      if (user?.uid) { // user.uid가 null이 아닐 경우만 실행
        const fetchedShareId = await fetchShareId(user.uid, shareId);

        if (fetchedShareId) {
          setShareModalId(fetchedShareId);
          setIsShareModalOpen(true);
        } else {
          console.log("공유 ID를 찾을 수 없습니다.");
        }
      } else {
        console.log("사용자 ID가 제공되지 않았습니다."); // 사용자 ID가 없을 때 처리
      }
    } else {
      console.log("공유 ID가 제공되지 않았습니다.");
    }
  };

  // console.log('사이드메뉴 리스트 아이디', shareId)

  const navigate = useNavigate();
  const handleChatLink = async () => {
    setCurrentChatId(id);
    navigate(`/hello/${id}`);
    onClose()
  };

  return (
    <li
      className={sidemenuListContainer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={sidemenuListBox}
        style={{
          transform: isSwiped ? 'translateX(-100px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <img className={sidemenuListIcon} src={iconSrc} alt="sidemenu_list" />
        <span className={sidemenuListText} onClick={handleChatLink}>
          {keywords}
        </span>
      </div>
      <div
        className={sidemenuSwiperHiddenBox}
        style={{
          transform: isSwiped ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <button className={sidemenuLinkShareIconBox} onClick={handleOpenShareModal}>
          <img src={sidemenu_linkshare} alt="sidemenu_linkshare" />
        </button>
        <button className={sidemenuDeleteIconBox} onClick={() => handleDelete(id)}>
          <img src={sidemenu_delete} alt="sidemenu_delete" />
        </button>
      </div>
    </li>
  );
};

export default SideMenuList;
