import { useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import useProductDetailStore from '../../../stores/useProductDetailStore';
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
  product: TProduct | null;
  isHeartFilled?: boolean;
  onCardClick: () => void; // 클릭 이벤트를 처리하는 함수
};

const SizeRecommendationCard = ({ product, isHeartFilled = false, onCardClick }: SizeRecommendationCardProps) => {
  // product가 null일 경우 아무것도 렌더링하지 않음
  if (!product) {
    return null;
  }
  // console.log('Product in SizeRecommendationCard:', product); // 전달된 product 확인
  // const [isChecked, setIsChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(isHeartFilled);
  const { handleProductDetailsClick } = useProductDetailStore();

  // const handleHeartChecked = () => {
  //   setIsChecked(!isChecked);
  // };
  const handleHeartChecked = () => {
    setIsChecked(prev => !prev); // 클릭 시 상태를 반전
  };

  return (
    // <div className={sizeRecommendationCardBox} onClick={() => (window.location.href = product.link)}>
    <div
      className={sizeRecommendationCardBox}
      onClick={() => {
        window.open(product.link, '_blank'); // 새 창에서 링크 열기
        onCardClick(); // 클릭한 시간을 기록하는 함수 호출
      }}
    >
      <div className={sizeRecommendationThumbnail}>
        <div className={sizeRecommendationThumbnailContainer}>
          <img src={product.image} alt={product.modelName} />
        </div>
        <div className={sizeRecommendationBadge}>
          <p className={sizeRecommendationBadgeTag}>{product?.sizeRecommend} 추천</p>
        </div>

        <div
          className={heartIconBox}
          onClick={e => {
            e.stopPropagation();
            handleHeartChecked(); // 클릭 시 하트 상태 변경
          }}
        >
          {/* <img src={isHeartFilled || isChecked ? heart_filled : heart_empty} alt="heart" /> */}
          <img src={isChecked ? heart_filled : heart_empty} alt="heart" />
        </div>

        <div className={brandIconBox}>
          <img src={brand_abcmart} alt="brand_abcmart" />
        </div>
      </div>
      <div className={productBox}>
        <div className={productName}>
          {/* brand가 없을 경우 'Unknown Brand'로 기본값 설정 */}
          <p className={productBrand}>{product.brand || 'Unknown Brand'}</p>
          <p className={productText}>{product.modelName}</p>
        </div>
        <p className={productText}>{product?.price}원</p>
      </div>
      <button
        className={productDetailsButton}
        onClick={e => {
          e.stopPropagation(); // 부모의 onClick이 실행되지 않도록 방지
          handleProductDetailsClick(product);
        }}
      >
        <img src={ai} alt="ai" />이 신발 더 알아보기
      </button>
    </div>
  );
};

export default SizeRecommendationCard;
