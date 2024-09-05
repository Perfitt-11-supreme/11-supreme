import { back_arrow } from '../../../assets/assets';
import { backButton, frame, headerDiv, headerTitle } from './header.css';

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <header className={headerDiv}>
        <div className={frame}>
          <button className={backButton}>
            <img src={back_arrow} alt="back" />
          </button>
        </div>
        <p className={headerTitle}>{title}</p>
        <div className={frame} />
      </header>
    </>
  );
};
export default Header;
