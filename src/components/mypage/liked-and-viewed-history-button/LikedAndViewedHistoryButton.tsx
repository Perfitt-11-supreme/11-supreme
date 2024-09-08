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
    navigate(buttonType === '좋아요' ? '/likedpage' : '/viewedhistorypage');
  };

  return (
    <>
      <article className={likedAndViewedHistoryButtonBox}>
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
