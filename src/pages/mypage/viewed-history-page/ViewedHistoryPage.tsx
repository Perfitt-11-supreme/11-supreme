import { useEffect, useState } from 'react';
import Header from '../../../components/common/header/Header';
import SizeRecommendationCard from '../../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsQuantity,
  filterProductsQuantityBox,
  likedAndViewedHistoryCointainer,
  viewedHistoryItemBox,
} from './viewed-history-page.css';
import LikedAndViewedHistoryButton from '../../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { back_arrow } from '../../../assets/assets';
import useUserStore from '../../../stores/useUserStore';
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';
import { LIKED_COLLECTION, VIEWED_COLLECTION } from '../../../firebase/firebase';

type Product = {
  brand?: string;
  image: string;
  link: string;
  modelName: string;
  productId?: string;
  price: number;
  sizeRecommend: string;
  uid: string;
  timestamp?: string;
  isLiked?: boolean; // 추가된 필드
};

const ViewedHistoryPage = () => {
  // 탭메뉴 상태관리
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  // 상품카드 상태관리
  const [productsData, setProductsData] = useState<{ [key: string]: Product }>({});
  const { user } = useUserStore();

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  // 카드 클릭 시 timestamp를 기록하는 함수
  const handleCardClick = async (productId: string) => {
    if (!user?.uid) {
      return; // 사용자가 없으면 중단
    }

    const timestamp = new Date().toISOString(); // 현재 시간을 기록
    try {
      // Firestore 문서 참조
      const docRef = doc(VIEWED_COLLECTION, user.uid); // Firestore 문서 참조

      // 해당 productId의 products 하위 필드에 timestamp 추가
      await updateDoc(docRef, {
        [`products.${productId}.timestamp`]: timestamp,
      });

      // 상태 업데이트 - UI 갱신
      setProductsData(prevProductsData => ({
        ...prevProductsData,
        [productId]: {
          ...prevProductsData[productId],
          timestamp,
        },
      }));
    } catch (error) {
      alert('handleCardClick 에러');
    }
  };

  // 하트 상태 변경 처리 (myViewed에 하트 상태 업데이트 및 myLiked에 추가) - 하트상태 firestore에 저장
  const handleHeartChecked = async (productId: string, newChecked: boolean) => {
    if (!user?.uid || !productId) return;

    try {
      // 'myViewed'에 하트 상태 업데이트
      const viewedDocRef = doc(VIEWED_COLLECTION, user.uid);
      const likedDocRef = doc(LIKED_COLLECTION, user.uid);
      const timestamp = new Date().toISOString();

      // 'myViewed' 컬렉션 업데이트 (하트 상태 및 클릭한 시간 업데이트)
      await updateDoc(viewedDocRef, {
        [`products.${productId}.isLiked`]: newChecked, // Firestore에 isLiked 상태 저장
        [`products.${productId}.timestamp`]: timestamp, // 클릭한 시간 기록
      });

      // 하트가 활성화되면 myLiked에 추가
      if (newChecked) {
        const productData = productsData[productId];
        const updatedProductData = { ...productData, isLiked: true, timestamp: new Date().toISOString() };

        await updateDoc(likedDocRef, {
          [`products.${productId}`]: updatedProductData,
        });
      } else {
        // 하트가 취소되면 myLiked에서 삭제
        await updateDoc(likedDocRef, {
          [`products.${productId}`]: deleteField(),
        });
      }
    } catch (error) {
      alert('handleHeartChecked 에러');
    }
  };

  // Firestore에서 'myViewed' 컬렉션 데이터 가져오기 - 하트상태 firestore에 저장
  const fetchViewedProducts = async () => {
    if (!user) return;
    try {
      const userDoc = doc(VIEWED_COLLECTION, user.uid);
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        setProductsData(docSnap.data()?.products || {});
      }
    } catch (error) {
      alert('fetchViewedProducts 에러');
    }
  };

  // 컴포넌트 마운트 시 Firestore에 데이터 추가
  useEffect(() => {
    fetchViewedProducts(); // Firestore에서 데이터 가져오기
  }, []);

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
              .map(([productId, product]) => (
                <SizeRecommendationCard
                  onCardClick={() => {
                    handleCardClick(productId); // 클릭 시 시간 기록 함수 호출
                  }}
                  key={productId} // key는 productId로 설정
                  // isHeartFilled={false}
                  isHeartFilled={product.isLiked} // Firestore에서 불러온 하트 상태
                  product={{
                    ...product,
                    brand: product.brand || 'Unknown Brand', // brand가 없을 경우 기본 값 할당
                  }}
                  // moveHeartProduct={moveProductFromViewedToLiked} // moveHeartProduct 함수 전달
                  moveHeartProduct={handleHeartChecked} // 하트 상태 변경 함수 전달
                  userId={user?.uid || ''} // 현재 사용자의 uid 전달
                  productId={productId} // productId도 props로 전달
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
