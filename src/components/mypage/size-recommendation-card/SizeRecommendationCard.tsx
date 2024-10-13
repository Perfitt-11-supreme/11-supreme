import { useEffect, useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import { TProduct } from '../../../types/product';
import {
  brandIconBox,
  heartIconBox,
  imageStyle,
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
  onAdd?: (productId: string) => void; // 하트 클릭 시 호출할 함수
  productId?: string;
  moveClickProduct?: (userId: string, productId: string) => Promise<void>; // moveClickProduct 함수 타입 정의
  userId?: string; // 사용자 uid
  moveHeartProduct?: (productId: string, newChecked: boolean) => void; // 하트 상태 변경 함수
};

const SizeRecommendationCard = ({
  product,
  isHeartFilled = false,
  onCardClick,
  productId,
  moveHeartProduct,
  moveClickProduct,
  userId,
}: SizeRecommendationCardProps) => {
  // product가 null일 경우 아무것도 렌더링하지 않음
  if (!product) {
    return <></>;
  }

  const [isChecked, setIsChecked] = useState(isHeartFilled);

  useEffect(() => {
    setIsChecked(isHeartFilled);
  }, [isHeartFilled]);

  // 하트가 비활성화될 때 myLiked에서 해당 제품을 삭제하는 코드 추가
  const handleHeartChecked = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (moveHeartProduct && productId) {
      moveHeartProduct(productId, newChecked);
    }
  };

  return (
    <div
      className={sizeRecommendationCardBox}
      onClick={async e => {
        window.open(product.link, '_blank'); // 새 창에서 링크 열기
        e.stopPropagation();
        if (userId && productId && moveClickProduct) {
          await moveClickProduct(userId, productId); // moveClickProduct 호출
        }
        onCardClick?.(); // 클릭한 시간을 기록하는 함수 호출 (옵셔널 체이닝 처리)
      }}
    >
      <div className={sizeRecommendationThumbnail}>
        <div className={sizeRecommendationThumbnailContainer}>
          <img src={product.image} alt={product.modelName} loading="lazy" className={imageStyle} />
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
        {/* <p className={productText}>{product?.price}</p> */}
      </div>
      <button className={productDetailsButton} type="button">
        <img src={ai} alt="ai" />이 신발 더 알아보기
      </button>
    </div>
  );
};

export default SizeRecommendationCard;
