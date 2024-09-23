import { useEffect, useState } from 'react';
import Header from '../../components/common/header/Header';
import SizeRecommendationCard from '../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsQuantity,
  filterProductsQuantityBox,
  likedAndViewedHistoryCointainer,
  viewedHistoryItemBox,
} from './viewedHistoryPage.css';
import LikedAndViewedHistoryButton from '../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { responsiveBox } from '../../styles/responsive.css';
import { useViewedHistoryStore } from '../../stores/useViewedHistoryStore';
import { back_arrow } from '../../assets/assets';

const ViewedHistoryPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  const { productsData, fetchViewedData, handleCardClick } = useViewedHistoryStore(); // zustand 상태 및 함수 가져오기

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchViewedData();
  }, [fetchViewedData]);

  return (
    <>
      <section className={likedAndViewedHistoryCointainer}>
        <Header imageSrc={back_arrow} alt="back arrow" />

        <LikedAndViewedHistoryButton handleClick={handleLikedOrViewedChange} activeTab={likedOrViewed} />

        <article className={filterProductsQuantityBox}>
          <div className={filterProductsQuantity}>{productsData ? Object.keys(productsData).length : 0}개</div>
        </article>

        <article className={viewedHistoryItemBox}>
          {productsData && Object.keys(productsData).length > 0 ? (
            Object.entries(productsData)
              .sort(([, a], [, b]) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()) // 클릭 시간으로 정렬
              .map(([key, product]) => (
                <SizeRecommendationCard
                  key={key}
                  product={{
                    ...product,
                    brand: product.brand || 'Unknown Brand', // brand가 없을 경우 기본 값 할당
                  }}
                  isHeartFilled={false}
                  onCardClick={() => handleCardClick(key)} // 클릭 시 시간 기록 함수 호출
                />
              ))
          ) : (
            <></> // productsData가 비어 있을 때 메시지 출력
          )}
        </article>
      </section>
    </div>
  );
};

export default ViewedHistoryPage;
