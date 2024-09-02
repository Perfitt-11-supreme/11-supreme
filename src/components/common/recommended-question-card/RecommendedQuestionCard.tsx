import { TButton } from '../../../types/button';
import { recommendedQuestionCardBox, recommendedQuestionCardItem } from './recommendedQuestionCard.css';

const RecommendedQuestionCard = ({ text }: TButton) => {
  return (
    <>
      <div className={recommendedQuestionCardBox}>
        <p className={recommendedQuestionCardItem}>{text}</p>
      </div>
    </>
  );
};

export default RecommendedQuestionCard;
