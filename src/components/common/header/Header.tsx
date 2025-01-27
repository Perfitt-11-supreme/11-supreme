import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { back_arrow, close, hamburger_menu } from '../../../assets/assets';
import SideMenu from '../../sidemenu/SideMenu';
import { header, headerContainer, headerIcon, headerTitle } from './header.css';

type THeader = {
  imageSrc?: string;
  alt?: string;
  title?: string;
  nav?: string;
};

const Header = ({ imageSrc, alt, title, nav }: THeader) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (path?: string) => {
    if (path) {
      navigate(path);
    } else {
      navigate(-1);
    }
  };

  const toggleSideMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    if (imageSrc === back_arrow || imageSrc === close) {
      handleNavigate(nav); // back 또는 close 이미지일 경우 지정된 경로로 이동
    } else if (imageSrc === hamburger_menu) {
      toggleSideMenu(); // 햄버거 아이콘일 경우 사이드 메뉴 열기
    }
  };

  return (
    <>
      {/* <div className={headerSpacer} /> */}
      <header className={headerContainer}>
        <div className={header}>
          <img className={headerIcon} src={imageSrc} alt={alt} onClick={handleClick} width="24px" height="24px" />
          <div className={headerTitle}>{title}</div>
        </div>
      </header>
      {isMenuOpen && <SideMenu onClose={toggleSideMenu} />}
    </>
  );
};

export default Header;
