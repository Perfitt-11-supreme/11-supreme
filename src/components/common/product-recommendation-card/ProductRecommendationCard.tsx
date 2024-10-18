import { useEffect, useState } from 'react';
import { brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
// import useProductDetailStore from '../../../stores/useProductDetailStore';
import { TProduct } from '../../../types/product';
import {
  brandIconBox,
  heartIconBox,
  productBox,
  productBrand,
  productName,
  // productPrice,
  productRecommendationCardBox,
  productRecommendationThumbnail,
  productRecommendationThumbnailContainer,
  productText,
} from './productRecommendationCard.css';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';

interface ProductRecommendationCardProps {
  product: TProduct;
  isHeartFilled?: boolean; // 하트 상태처리 - 하윤
  productId?: string;
  userId?: string; // 사용자 uid
  moveHeartProduct?: (productId: string, newChecked: boolean) => void; // productId 추가
  onCardClick?: () => void; // 클릭 이벤트를 처리하는 함수
  showHeart?: boolean; // 특정페이지에서 하트를 감추는 조건부렌더링 처리 - 하윤
}

const ProductRecommendationCard = ({
  product,
  isHeartFilled = false,
  onCardClick,
  productId,
  moveHeartProduct,
  userId,
  showHeart = true,
}: ProductRecommendationCardProps) => {
  // const [isChecked, setIsChecked] = useState(false);
  const [isChecked, setIsChecked] = useState(isHeartFilled); // 하윤
  const { addProduct, deleteProduct } = useMyLikedProductStore(); // 하윤
  // const { handleProductDetailsClick } = useProductDetailStore(); // 카드 클릭시(썸네일 포함) 디테일로 새창 이동 및 경로 오류 방지 - 하윤
  // const handleHeartChecked = () => {
  //   setIsChecked(!isChecked);
  // };

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
      if (!product) {
        return;
      }
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

  // 카드 클릭시(썸네일 포함) 디테일로 새창 이동 및 경로 오류 방지 - 하윤
  const handleProductRecommendationCardClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 페이지 이동 막기
    e.stopPropagation();
    onCardClick?.();
    if (product && product.link) {
      window.open(product.link, '_blank'); // 새 창에서 열기
    }
  };

  return (
    <>
      {/* <div className={productRecommendationCardBox} onClick={() => product && handleProductDetailsClick(product)}> */}
      <div className={productRecommendationCardBox} onClick={handleProductRecommendationCardClick}>
        {/* Thumbnail */}
        <div className={productRecommendationThumbnail}>
          <div className={productRecommendationThumbnailContainer}>
            <img src={product?.image} alt={product?.brand} loading="lazy" width="162px" height="162px" />
          </div>

          {showHeart && ( // 하트 표시 여부를 showHeart로 제어 - 하윤
            <div
              className={heartIconBox}
              onClick={e => {
                e.stopPropagation();
                handleHeartChecked(e);
              }}
            >
              {isChecked ? (
                <img src={heart_filled} alt="heart_filled" width="19px" height="18px" />
              ) : (
                <img src={heart_empty} alt="heart_empty" width="19px" height="18px" />
              )}
            </div>
          )}

          <div className={brandIconBox}>
            <img src={brand_abcmart} alt="brand_abcmart" width="24px" height="24px" />
          </div>
        </div>
        {/* Product */}
        {/* <div className={productBox} onClick={() => product && handleProductDetailsClick(product)}> */}
        <div className={productBox}>
          <div className={productName}>
            {/* <p className={productBrand}>{product?.brand}</p> */}
            <p className={productBrand}>{product?.brand || 'Unknown Brand'}</p>
            <p className={productText}>{product?.modelName}</p>
          </div>
          {/* 가격 없애기로 한 것 통일 - 하윤 */}
          {/* <p className={productPrice}>248,000원</p> */}
        </div>
      </div>
    </>
  );
};

export default ProductRecommendationCard;
