import { useNavigate } from 'react-router-dom';
import { back_arrow } from '../../../assets/assets';
import { backButton, frame, headerDiv, headerTitle } from './header.css';
import Kebab from '../../kebab/Kebab';

const Header = ({ title }: { title?: string }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };

  const showKebab = location.pathname === '/shoesinfo';
  return (
    <>
      <header className={headerDiv}>
        <div className={frame}>
          <button className={backButton} onClick={handleNavigate}>
            <img src={back_arrow} alt="back" />
          </button>
        </div>
        <p className={headerTitle}>{title}</p>
        {showKebab ? <Kebab /> : <div className={frame} />}
      </header>
    </>
  );
};
export default Header;
