import { back_arrow } from '../../assets/assets';
import Header from '../../components/common/header/Header';
import SizeRecommendationCard from '../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsQuantity,
  filterProductsQuantityBox,
  likedAndViewedHistoryCointainer,
  viewedHistoryItemBox,
} from './viewedHistoryPage.css';
import LikedAndViewedHistoryButton from '../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { useState } from 'react';
import { responsiveBox } from '../../styles/responsive.css';

const ViewedHistoryPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  return (
    <>
      <div className={responsiveBox}>
        <section className={likedAndViewedHistoryCointainer}>
          <Header imageSrc={back_arrow} alt="back arrow" />

          <LikedAndViewedHistoryButton handleClick={handleLikedOrViewedChange} activeTab={likedOrViewed} />

          <article className={filterProductsQuantityBox}>
            <div className={filterProductsQuantity}>5개</div>
          </article>

          <article className={viewedHistoryItemBox}>
            <SizeRecommendationCard />
            <SizeRecommendationCard />
            <SizeRecommendationCard />
            <SizeRecommendationCard />
            <SizeRecommendationCard />
          </article>
        </section>
      </div>
    </>
  );
};

export default ViewedHistoryPage;
