import { useEffect, useState } from 'react';
import Header from '../../../components/common/header/Header';
import SizeRecommendationCard from '../../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsQuantity,
  filterProductsQuantityBox,
  likedAndViewedHistoryCointainer,
  viewedHistoryItemBox,
} from './viewedHistoryPage.css';
import LikedAndViewedHistoryButton from '../../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { back_arrow } from '../../../assets/assets';
import useUserStore from '../../../stores/useUserStore';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';
import useMyViewedProductStore from '../../../stores/useMyViewedProductStore';

const ViewedHistoryPage = () => {
  // 탭메뉴 상태관리
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  // UseUserStore로부터 유저 정보 가져오기
  const { user } = useUserStore();
  // 상품카드 상태관리 - zustand
  const { fetchProductsLikedData, handleProductHeartChecked } = useMyLikedProductStore();
  const { productsData, fetchProductsViewedData, handleCardClick } = useMyViewedProductStore();

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  useEffect(() => {
    if (user?.uid) {
      fetchProductsViewedData(user.uid);
      fetchProductsLikedData(user.uid);
    }
  }, [user?.uid]);

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
              .sort(([, a], [, b]) => {
                const timestampA = a?.timestamp ? new Date(a.timestamp).getTime() : 0;
                const timestampB = b?.timestamp ? new Date(b.timestamp).getTime() : 0;
                return timestampB - timestampA;
              })
              .map(([productId, product]) => (
                <SizeRecommendationCard
                  product={product}
                  userId={user?.uid || ''}
                  productId={productId}
                  key={productId}
                  onCardClick={() =>
                    handleCardClick(user?.uid || '', product?.productId || product?.modelNo || '', product)
                  }
                  showHeart={false} // 하트 아이콘 감추기
                />
              ))
          ) : (
            <></>
          )}
        </article>
      </section>
    </>
  );
};

export default ViewedHistoryPage;
