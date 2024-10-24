import { checked } from '../../../assets/assets';
import { keywordCard, keywordCardChecked } from './keywordCard.css';

type KeywordCardProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
};


const KeywordCard = ({ text, isSelected, onClick }: KeywordCardProps) => {

  return (
    <>
      <div className={isSelected ? keywordCardChecked : keywordCard} onClick={onClick}>
        {isSelected && <img src={checked} alt="checked" />}
        {text}
      </div>
    </>
  );
};

export default KeywordCard;
