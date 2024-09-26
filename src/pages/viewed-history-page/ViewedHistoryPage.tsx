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
// import useAddUserIdToFirestoreHook from '../../hooks/useAddUserIdToFirestoreHook';
// 테스트
import useUserStore from '../../stores/useUserStore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const ViewedHistoryPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  const { productsData, fetchViewedData, handleCardClick } = useViewedHistoryStore(); // zustand 상태 및 함수 가져오기
  //테스트
  const { user } = useUserStore();
  const handleAddToMyProducts = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      const userDoc = doc(collection(db, 'myLiked'), user.uid);
      await setDoc(userDoc, {
        uid: user.uid,
        brands: {},
        products: {},
      });
      console.log('Product added to Firestore');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  //

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

        {/* 테스트용 버튼 */}
        <div>
          <button onClick={handleAddToMyProducts}>Add Product</button>
        </div>
        {/*  */}

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
                  onCardClick={() => {
                    handleCardClick(key); // 클릭 시 시간 기록 함수 호출
                    // useAddUserId(key);
                  }}
                />
              ))
          ) : (
            <></> // productsData가 비어 있을 때 메시지 출력
          )}
        </article>
      </section>
    </>
  );
};

export default ViewedHistoryPage;
