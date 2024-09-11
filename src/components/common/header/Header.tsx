import { useNavigate } from 'react-router-dom';
import { header, headerContainer, headerIcon, headerSpacer, headerTitle } from './header.css';

type THeader = {
  imageSrc: string;
  alt: string;
  title?: string;
  nav?: string;
};

const Header = ({ imageSrc, alt, title, nav }: THeader) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (nav?.length! > 0) navigate(nav!);
    else navigate(-1);
  };
  return (
    <>
      <div className={headerSpacer} />
      <header className={headerContainer}>
        <div className={header}>
          <img className={headerIcon} src={imageSrc} alt={alt} onClick={handleNavigate} />
          <div className={headerTitle}>{title}</div>
        </div>
      </header>
    </>
  );
};

export default Header;
