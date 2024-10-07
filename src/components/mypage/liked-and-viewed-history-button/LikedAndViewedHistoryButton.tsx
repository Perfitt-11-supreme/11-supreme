import { useEffect, useState } from 'react';
import { TButton } from '../../../types/button';
import {
  likedAndViewedHistoryButton,
  likedAndViewedHistoryButtonBox,
  likedAndViewedHistoryButtonChecked,
} from './likedAndViewedHistoryButton.css';
import { useNavigate } from 'react-router-dom';

type LikedAndViewedHistoryButtonProps = {
  handleClick: (buttonType: string) => void;
  activeTab: string;
};

const LikedAndViewedHistoryButton = ({ handleClick, activeTab }: LikedAndViewedHistoryButtonProps) => {
  const buttons: TButton[] = [{ text: '좋아요' }, { text: '최근 본' }];
  const navigate = useNavigate();

  const handleButtonClick = (buttonType: string) => {
    handleClick(buttonType);
    navigate(buttonType === '좋아요' ? '/liked' : '/viewedhistory');
  };

  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setIsHidden(currentScrollY > lastScrollY ? true : false);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <article
        className={likedAndViewedHistoryButtonBox}
        style={{
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {buttons.map(({ text }) => (
          <button
            key={text}
            type="button"
            className={activeTab === text ? likedAndViewedHistoryButtonChecked : likedAndViewedHistoryButton}
            onClick={() => handleButtonClick(text)}
          >
            {text}
          </button>
        ))}
      </article>
    </>
  );
};

export default LikedAndViewedHistoryButton;
