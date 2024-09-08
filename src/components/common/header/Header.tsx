import { useNavigate } from 'react-router-dom';
import { header, headerIcon, headerTitle } from './header.css';

type THeader = {
  imageSrc: string;
  alt: string;
  title?: string;
};

const Header = ({ imageSrc, alt, title }: THeader) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <>
      <header className={header}>
        <img className={headerIcon} src={imageSrc} alt={alt} onClick={handleNavigate} />
        <div className={headerTitle}>{title}</div>
      </header>
    </>
  );
};

export default Header;
