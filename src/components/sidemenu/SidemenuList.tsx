import React, { useRef, useState } from 'react';
import { sidemenu_delete, sidemenu_linkshare } from '../../assets/assets';
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
  handleDelete: (id: string) => void;
};

const SidemenuList = ({ iconSrc, keywords, timestamp, id, handleDelete }: SidemenuListProps) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const startX = useRef<number | null>(null);
  const threshold = 50; // 스와이프 임계값

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
        <span className={sidemenuListText}>{keywords}</span>
      </div>
      <div
        className={sidemenuSwiperHiddenBox}
        style={{
          transform: isSwiped ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <button className={sidemenuLinkShareIconBox}>
          <img src={sidemenu_linkshare} alt="sidemenu_linkshare" />
        </button>
        <button className={sidemenuDeleteIconBox} onClick={() => handleDelete(id)}>
          <img src={sidemenu_delete} alt="sidemenu_delete" />
        </button>
      </div>
    </li>
  );
};

export default SidemenuList;
