import { useState } from 'react';
import { brand_abcmart, heart_empty, heart_filled } from '../../../assets/assets';
import useProductDetailStore from '../../../stores/useProductDetailStore';
import { TProduct } from '../../../types/product';
import {
  brandIconBox,
  heartIconBox,
  productBox,
  productBrand,
  productName,
  productPrice,
  productRecommendationCardBox,
  productRecommendationThumbnail,
  productRecommendationThumbnailContainer,
  productText,
} from './productRecommendationCard.css';

interface ProductRecommendationCardProps {
  product: TProduct;
}


const ProductRecommendationCard = ({ product }: ProductRecommendationCardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { handleProductDetailsClick } = useProductDetailStore();
  const handleHeartChecked = () => {
    setIsChecked(!isChecked);
  };




  return (
    <>
      <div className={productRecommendationCardBox}>
        {/* Thumbnail */}
        <div className={productRecommendationThumbnail}>
          <div className={productRecommendationThumbnailContainer}>
            <img src={product?.image} alt={product?.brand} loading='lazy' />
          </div>
          <div className={heartIconBox} onClick={(e) => {
            e.stopPropagation();
            handleHeartChecked();
          }}>
            {isChecked ? <img src={heart_filled} alt="heart_filled" /> : <img src={heart_empty} alt="heart_empty" />}
          </div>

          <div className={brandIconBox}>
            <img src={brand_abcmart} alt="brand_abcmart" />
          </div>
        </div>
        {/* Product */}
        <div className={productBox} onClick={() => product && handleProductDetailsClick(product)}>
          <div className={productName}>
            <p className={productBrand}>{product?.brand}</p>
            <p className={productText}>{product?.modelName}</p>
          </div>
          <p className={productPrice}>248,000원</p>
        </div>
      </div>
    </>
  );
};

export default ProductRecommendationCard;
