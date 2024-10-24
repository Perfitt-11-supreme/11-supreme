import { recommendedQuestionCardBox, recommendedQuestionCardItem } from './recommendedQuestionCard.css';

type RecommendedQuestionCardProps = {
  text: string;
  onClick: () => void;
}

const RecommendedQuestionCard = ({ text, onClick }: RecommendedQuestionCardProps) => {

  return (
    <>
      <div className={recommendedQuestionCardBox} onClick={onClick}>
        <p className={recommendedQuestionCardItem}>{text}</p>
      </div>
    </>
  );
};

export default RecommendedQuestionCard;
