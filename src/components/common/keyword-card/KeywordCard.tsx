import { useState } from 'react';
import { checked } from '../../../assets/assets.css';
import { TButton } from '../../../types/button';
import { keywordCard, keywordCardChecked } from './keywordCard.css';

const KeywordCard = ({ text }: TButton) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleKeywordCardChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className={isChecked ? keywordCardChecked : keywordCard} onClick={handleKeywordCardChecked}>
        {isChecked && <img src={checked} alt="checked" />}
        {text}
      </div>
    </>
  );
};

export default KeywordCard;
