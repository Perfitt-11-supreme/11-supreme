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
  onCardClick?: () => void; // 클릭 이벤트를 처리하는 함수
  onDelete?: (id: string) => void; // 삭제 함수
};

const SizeRecommendationCard = ({
  product,
  isHeartFilled = false,
  onCardClick,
  onDelete,
}: SizeRecommendationCardProps) => {
  // product가 null일 경우 아무것도 렌더링하지 않음
  if (!product) {
    return <></>;
  }
  // console.log('Product in SizeRecommendationCard:', product); // 전달된 product 확인
  const [isChecked, setIsChecked] = useState(isHeartFilled);
  const { handleProductDetailsClick } = useProductDetailStore();

  const handleHeartChecked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(prev => !prev);

    // 하트가 채워져 있을 때 (삭제 이벤트)
    if (isChecked && product?.productId) {
      console.log('Deleting product with productId:', product?.productId); // productId 확인
      onDelete?.(product.productId); // 삭제 함수 호출
      // if (isChecked) {
      //   console.log('Deleting product with productId:', product?.productId); // productId 확인
      //   if (product?.productId) {
      //     onDelete?.(product.productId); // 삭제 함수 호출
      //   } else {
      //     console.log('Product ID is undefined');
      //   }
      // }
    }
  };
  return (
    <div
      className={sizeRecommendationCardBox}
      onClick={() => {
        window.open(product.link, '_blank'); // 새 창에서 링크 열기
        onCardClick?.(); // 클릭한 시간을 기록하는 함수 호출 (옵셔널 체이닝 처리)
      }}
    >
      <div className={sizeRecommendationThumbnail}>
        <div className={sizeRecommendationThumbnailContainer}>
          <img src={product.image} alt={product.modelName} loading='lazy' />
        </div>
        <div className={sizeRecommendationBadge}>
          <p className={sizeRecommendationBadgeTag}>{product?.sizeRecommend} 추천</p>
        </div>

        <div
          className={heartIconBox}
          onClick={e => {
            e.stopPropagation();
            handleHeartChecked(e);
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
      <button className={productDetailsButton} type="button">
        <img src={ai} alt="ai" />이 신발 더 알아보기
      </button>
    </div>
  );
};

export default SizeRecommendationCard;
