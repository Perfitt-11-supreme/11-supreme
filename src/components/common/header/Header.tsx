import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { header, headerContainer, headerIcon, headerSpacer, headerTitle } from './header.css';
import SideMenu from '../../sidemenu/SideMenu';

type THeader = {
  imageSrc?: string;
  alt?: string;
  title?: string;
  nav?: string;
};

const Header = ({ imageSrc, alt, title, nav }: THeader) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = () => {
    if (nav?.length! > 0) navigate(nav!);
    else navigate(-1);
  };

  const toggleSideMenu = () => {
    console.log('Toggle SideMenu called!');
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    console.log('imageSrc:', imageSrc);

    if (imageSrc?.includes('back') || imageSrc?.includes('close')) {
      console.log('Navigating...');
      handleNavigate();
    } else if (imageSrc?.includes('hamburger')) {
      console.log('Opening SideMenu...');
      toggleSideMenu();
    } else {
      console.log('No matching imageSrc');
    }
  };

  return (
    <>
      <div className={headerSpacer} />
      <header className={headerContainer}>
        <div className={header}>
          <img className={headerIcon} src={imageSrc} alt={alt} onClick={handleClick} />
          <div className={headerTitle}>{title}</div>
        </div>
      </header>
      {isMenuOpen && <SideMenu onClose={toggleSideMenu} />}
    </>
  );
};

export default Header;
