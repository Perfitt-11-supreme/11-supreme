import { header, headerIcon } from './header.css';

type TImage = {
  imageSrc: string;
  alt: string;
};

const Header = ({ imageSrc, alt }: TImage) => {
  return (
    <>
      <header className={header}>
        <img className={headerIcon} src={imageSrc} alt={alt} />
      </header>
    </>
  );
};

export default Header;
