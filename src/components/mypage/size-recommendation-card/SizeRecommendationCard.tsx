import { useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import { TProduct } from '../../../types/product';
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
  sizeRecommendationThumbnailContainer,
} from './sizeRecommendationCard.css';

type SizeRecommendationCardProps = {
  isHeartFilled?: boolean;
  product?: TProduct;
};

const SizeRecommendationCard = ({ product, isHeartFilled = false }: SizeRecommendationCardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  // const { setFitOpen } = useModalStore();

  // const handleFitCommentClick = () => {
  //   setFitOpen(true);  // 이 신발 더보기 버튼 클릭 시 Modal 열기
  // };

  const handleProductDetailsClick = () => {
    if (product?.link) {
      window.location.href = product?.link; // 버튼 클릭 시 product.link로 이동
    }
  };

  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className={sizeRecommendationCardBox}>
        <div className={sizeRecommendationThumbnail}>
          <div className={sizeRecommendationThumbnailContainer}>
            <img src={product?.image} />
          </div>
          <div className={sizeRecommendationBadge}>
            <p className={sizeRecommendationBadgeTag}>240mm 추천</p>
          </div>

          <div
            className={heartIconBox}
            onClick={e => {
              e.stopPropagation();
              handleHeartChecked();
            }}
          >
            <img src={isHeartFilled || isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
          <div className={brandIconBox}>
            <img src={brand_abcmart} alt="brand_abcmart" />
          </div>
        </div>
        <div className={productBox}>
          <div className={productName}>
            <p className={productBrand}>{product?.brand}</p>
            <p className={productText}>{product?.modelName}</p>
          </div>
          <p className={productText}>100,000원</p>
        </div>
        <button className={productDetailsButton} onClick={handleProductDetailsClick}>
          <img src={ai} alt="ai" />이 신발 더 알아보기
        </button>
      </div>
    </>
  );
};

export default SizeRecommendationCard;
