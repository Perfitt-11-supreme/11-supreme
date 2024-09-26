import { useNavigate } from 'react-router-dom';
import { back_arrow } from '../../../assets/assets';
import { backButton, frame, headerDiv, headerTitle } from './header.css';
import Kebab from '../../kebab/Kebab';
import React from 'react';

const Header = ({ title, customNavigate }: { title?: string; customNavigate?: () => void }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  const showKebab = location.pathname.startsWith('/shoesinfo/');
  return (
    <>
      <header className={headerDiv}>
        <div className={frame}>
          <button className={backButton} onClick={customNavigate ? customNavigate : handleNavigate}>
            <img src={back_arrow} alt="back" />
          </button>
        </div>
        <p className={headerTitle}>{title}</p>
        {showKebab ? <Kebab /> : <div className={frame} />}
      </header>
    </>
  );
};
export default React.memo(Header);
