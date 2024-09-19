import { back_arrow } from '../../assets/assets';
import Header from '../../components/common/header/Header';
import SizeRecommendationCard from '../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsAndBrandsQuantity,
  filterProductsAndBrandsQuantityBox,
  likedAndViewedHistoryCointainer,
  likedAndViewedHistoryItemBox,
} from './likedPage.css';
import LikedAndViewedHistoryButton from '../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { useState } from 'react';
import ProductAndBrandButton from '../../components/mypage/product-and-brand-button/ProductAndBrandButton';
import LikedInBrand from '../../components/mypage/liked-in-brand/LikedInBrand';
import { responsiveBox } from '../../styles/responsive.css';

const LikedPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('좋아요');
  const [productOrBrand, setProductOrBrand] = useState('상품');

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  const handleProductOrBrandChange = (buttonType: string) => {
    setProductOrBrand(buttonType);
  };

  return (
    <>
      <div className={responsiveBox}>
        <section className={likedAndViewedHistoryCointainer}>
          <Header imageSrc={back_arrow} alt="back arrow" />

          <LikedAndViewedHistoryButton handleClick={handleLikedOrViewedChange} activeTab={likedOrViewed} />

          {likedOrViewed === '좋아요' && (
            <ProductAndBrandButton handleClick={handleProductOrBrandChange} activeTab={productOrBrand} />
          )}

          <article className={filterProductsAndBrandsQuantityBox}>
            {productOrBrand === '상품' ? (
              <div className={filterProductsAndBrandsQuantity}>5개</div>
            ) : (
              <>
                <div className={filterProductsAndBrandsQuantity}>3개</div>
                <LikedInBrand />
              </>
            )}
          </article>

          {likedOrViewed === '좋아요' && productOrBrand === '상품' && (
            <article className={likedAndViewedHistoryItemBox}>
              {/* SizeRecommendationCard에 isHeartFilled prop을 전달 */}
              <SizeRecommendationCard isHeartFilled />
              <SizeRecommendationCard isHeartFilled />
              <SizeRecommendationCard isHeartFilled />
              <SizeRecommendationCard isHeartFilled />
              <SizeRecommendationCard isHeartFilled />
            </article>
          )}
        </section>
      </div>
    </>
  );
};

export default LikedPage;
