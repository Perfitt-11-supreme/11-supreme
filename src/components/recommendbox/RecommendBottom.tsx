import { moreArrow, textBottom, textBottomContainer } from '../itembox/itemBox.css';

type RecommendBottomProps = {
  text: string;
  imageSrc: string;
  onClick?: () => void;
};

const RecommendBottom = ({ text, imageSrc, onClick }: RecommendBottomProps) => {
  return (
    <button className={textBottomContainer} onClick={onClick}>
      <span className={textBottom}>{text}</span>
      <img src={imageSrc} alt="" className={moreArrow} />
    </button>
  );
};

export default RecommendBottom;
