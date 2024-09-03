import { useState } from 'react';
import { brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets.css';
import {
  brandIconBox,
  heartIconBox,
  productBox,
  productBrand,
  productName,
  productPrice,
  productRecommendationCardBox,
  productRecommendationThumbnail,
  productText,
} from './productRecommendationCard.css';

const ProductRecommendationCard = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className={productRecommendationCardBox}>
        {/* Thumbnail */}
        <div className={productRecommendationThumbnail}>
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
            <p className={productBrand}>New Balance</p>
            <p className={productText}>뉴발란스 2002R 고어텍스</p>
          </div>
          <p className={productPrice}>248,000원</p>
        </div>
      </div>
    </>
  );
};

export default ProductRecommendationCard;
