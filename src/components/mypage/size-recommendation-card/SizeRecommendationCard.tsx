import { useEffect, useState } from 'react';
import { ai, brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';
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
  productId?: string;
  userId?: string; // 사용자 uid
  moveHeartProduct?: (productId: string, newChecked: boolean) => void; // productId 추가
  showHeart?: boolean; // 특정페이지에서 하트를 감추는 조건부렌더링 처리
};

const SizeRecommendationCard = ({
  product,
  isHeartFilled = false,
  onCardClick,
  productId,
  moveHeartProduct,
  userId,
  showHeart = true, // 기본값으로 하트를 보여주도록 설정
}: SizeRecommendationCardProps) => {
  // product가 null일 경우 아무것도 렌더링하지 않음
  if (!product) {
    return <></>;
  }

  const [isChecked, setIsChecked] = useState(isHeartFilled);
  const { addProduct, deleteProduct } = useMyLikedProductStore();

  useEffect(() => {
    setIsChecked(isHeartFilled);
  }, [isHeartFilled]);

  // 하트가 비활성화될 때 myLiked에서 해당 제품을 삭제하는 코드 추가
  const handleHeartChecked = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (moveHeartProduct && productId) {
      moveHeartProduct(productId, newChecked); // 선택한 productId와 새로운 좋아요 상태 전달
    }

    if (userId && productId) {
      if (newChecked) {
        const productWithUid = {
          ...product,
          uid: userId, // uid 필드를 명시적으로 추가
        };
        await addProduct(userId, productId, productWithUid); // uid가 추가된 객체 전달
      } else {
        await deleteProduct(userId, productId);
      }
    }
  };

  return (
    <div
      className={sizeRecommendationCardBox}
      onClick={async e => {
        window.open(product.link, '_blank'); // 새 창에서 링크 열기
        e.stopPropagation();
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

        {showHeart && ( // 하트 표시 여부를 showHeart로 제어
          <div
            className={heartIconBox}
            onClick={e => {
              e.stopPropagation();
              handleHeartChecked(e);
            }}
          >
            <img src={isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
        )}

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
