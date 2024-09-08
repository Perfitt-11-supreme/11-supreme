import { useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import {
  brandIconBox,
  heartIconBox,
  productBox,
  productBrand,
  productDetailsButton,
  productName,
  productText,
  sizeRecommendationBadge,
  sizeRecommendationBadgeTag,
  sizeRecommendationCardBox,
  sizeRecommendationThumbnail,
} from './sizeRecommendationCard.css';

type SizeRecommendationCardProps = {
  isHeartFilled?: boolean;
};

const SizeRecommendationCard = ({ isHeartFilled = false }: SizeRecommendationCardProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className={sizeRecommendationCardBox}>
        <div className={sizeRecommendationThumbnail}>
          <div className={sizeRecommendationBadge}>
            <p className={sizeRecommendationBadgeTag}>240mm 추천</p>
          </div>

          <div className={heartIconBox} onClick={handleHeartChecked}>
            <img src={isHeartFilled || isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
          <div className={brandIconBox}>
            <img src={brand_abcmart} alt="brand_abcmart" />
          </div>
        </div>
        <div className={productBox}>
          <div className={productName}>
            <p className={productBrand}>Hoka</p>
            <p className={productText}>호카 카하 2 로우 고어텍스</p>
          </div>
          <p className={productText}>100,000원</p>
        </div>
        <button className={productDetailsButton}>
          <img src={ai} alt="ai" />이 신발 더 알아보기
        </button>
      </div>
    </>
  );
};

export default SizeRecommendationCard;
