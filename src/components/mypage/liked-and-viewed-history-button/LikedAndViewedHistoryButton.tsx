import { TButton } from '../../../types/button';
import {
  likedAndViewedHistoryButton,
  likedAndViewedHistoryButtonBox,
  likedAndViewedHistoryButtonChecked,
} from './likedAndViewedHistoryButton.css';

type LikedAndViewedHistoryButtonProps = {
  handleClick: (buttonType: string) => void;
  activeTab: string;
};

const LikedAndViewedHistoryButton = ({ handleClick, activeTab }: LikedAndViewedHistoryButtonProps) => {
  const buttons: TButton[] = [{ text: '좋아요' }, { text: '최근 본' }];

  return (
    <>
      <article className={likedAndViewedHistoryButtonBox}>
        {buttons.map(({ text }) => (
          <button
            key={text}
            type="button"
            className={activeTab === text ? likedAndViewedHistoryButtonChecked : likedAndViewedHistoryButton}
            onClick={() => handleClick(text)}
          >
            {text}
          </button>
        ))}
      </article>
    </>
  );
};

export default LikedAndViewedHistoryButton;
