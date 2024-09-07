// KebabMenu.tsx
import React, { useState } from 'react';
import {
  menuContainer,
  kebabButton,
  dropdownMenu,
  dropdownMenuVisible,
  menuItem,
  menuItemText,
  deleteItem,
} from './kebab.css';
import { deleted, kebab, modify, share } from '../../assets/assets';

const KebabMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
    console.log(isOpen);
  };

  return (
    <div className={menuContainer}>
      <button className={kebabButton} onClick={toggleMenu}>
        <img src={kebab} />
      </button>
      <div className={`${dropdownMenu} ${isOpen ? dropdownMenuVisible : ''}`}>
        <div className={menuItem}>
          <p className={`${menuItemText} ${deleteItem}`}>
            <img src={deleted} alt="삭제" />
            삭제하기
          </p>
        </div>
        <div className={menuItem}>
          <p className={menuItemText}>
            <img src={modify} alt="수정" />
            수정하기
          </p>
        </div>
        <div className={menuItem}>
          <p className={menuItemText}>
            <img src={share} alt="공유" />
            공유하기
          </p>
        </div>
      </div>
    </div>
  );
};

export default KebabMenu;
