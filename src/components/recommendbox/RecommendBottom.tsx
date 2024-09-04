import { moreArrow, textBottom, textBottomContainer } from '../itembox/itemBox.css';

interface RecommendBottomProps {
  text: string;
  imageSrc: string;
  onClick?: () => void;
}

const RecommendBottom: React.FC<RecommendBottomProps> = ({ text, imageSrc, onClick }) => {
  return (
    <button className={textBottomContainer} onClick={onClick}>
      <span className={textBottom}>{text}</span>
      <img src={imageSrc} alt="" className={moreArrow} />
    </button>
  );
};

export default RecommendBottom;
