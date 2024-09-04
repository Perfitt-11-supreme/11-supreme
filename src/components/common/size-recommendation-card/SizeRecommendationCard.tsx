import { useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import {
  sizeRecommendationCardBox,
  sizeRecommendationThumbnail,
  sizeRecommendationBadge,
  sizeRecommendationBadgeTag,
  heartIconBox,
  brandIconBox,
  productBox,
  productBrand,
  productName,
  productDetailsButton,
  productText,
} from './sizeRecommendationCard.css';

const SizeRecommendationCard = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className={sizeRecommendationCardBox}>
        {/* Thumbnail */}
        <div className={sizeRecommendationThumbnail}>
          <div className={sizeRecommendationBadge}>
            <p className={sizeRecommendationBadgeTag}>240mm 추천</p>
          </div>
          <div className={heartIconBox} onClick={handleHeartChecked}>
            {isChecked ? <img src={heart_filled} alt="heart_filled" /> : <img src={heart_empty} alt="heart_empty" />}
          </div>
          <div className={brandIconBox}>
            <img src={brand_abcmart} alt="brand_abcmart" />
          </div>
        </div>
        {/* Product */}
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
