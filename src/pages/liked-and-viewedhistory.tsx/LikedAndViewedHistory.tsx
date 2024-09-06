import { back_arrow } from '../../assets/assets';
import Header from '../../components/common/header/Header';
import SizeRecommendationCard from '../../components/common/size-recommendation-card/SizeRecommendationCard';
import {
  FilterProductsAndBrandsButton,
  FilterProductsAndBrandsButtonBox,
  FilterProductsAndBrandsQuantity,
  FilterProductsAndBrandsQuantityBox,
  LikedAndViewedHistoryButton,
  LikedAndViewedHistoryButtonBox,
  LikedAndViewedHistoryCointainer,
  LikedAndViewedHistoryItemBox,
} from './likedAndViewedHistory.css';

const LikedAndViewedHistory = () => {
  return (
    <>
      <h1>LikedAndViewedHistory Component</h1>
      <section className={LikedAndViewedHistoryCointainer}>
        <Header imageSrc={back_arrow} alt="back arrow" />
        <article className={LikedAndViewedHistoryButtonBox}>
          <button className={LikedAndViewedHistoryButton}>좋아요</button>
          <button className={LikedAndViewedHistoryButton}>최근 본</button>
        </article>
        <article className={FilterProductsAndBrandsButtonBox}>
          <button className={FilterProductsAndBrandsButton}>상품</button>
          <button className={FilterProductsAndBrandsButton}>브랜드</button>
        </article>
        <article className={FilterProductsAndBrandsQuantityBox}>
          <div className={FilterProductsAndBrandsQuantity}>5개</div>
        </article>

        <article className={LikedAndViewedHistoryItemBox}>
          <SizeRecommendationCard />
          <SizeRecommendationCard />
          <SizeRecommendationCard />
          <SizeRecommendationCard />
          <SizeRecommendationCard />
        </article>
      </section>
    </>
  );
};

export default LikedAndViewedHistory;
