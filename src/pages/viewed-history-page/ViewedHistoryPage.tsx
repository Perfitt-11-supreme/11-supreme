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
import { useViewedHistoryStore } from '../../stores/useViewedHistoryStore';
import { back_arrow } from '../../assets/assets';
// import useAddUserIdToFirestoreHook from '../../hooks/useAddUserIdToFirestoreHook';
// 테스트
import useUserStore from '../../stores/useUserStore';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import LoadingPage from '../loading-page/loadingPage';

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
};

const ViewedHistoryPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  // const { productsData, fetchViewedData, handleCardClick } = useViewedHistoryStore(); // zustand 상태 및 함수 가져오기
  const { fetchViewedData, handleCardClick } = useViewedHistoryStore(); // zustand 상태 및 함수 가져오기
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  //테스트
  const [productsData, setProductsData] = useState<{ [key: string]: Product }>({});
  const { user } = useUserStore();
  // const handleAddToMyProducts = async () => {
  //   if (!user) {
  //     console.error('User is not logged in');
  //     return;
  //   }

  //   try {
  //     const userDoc = doc(collection(db, 'myLiked'), user.uid);
  //     await setDoc(userDoc, {
  //       uid: user.uid,
  //       brands: {},
  //       products: {},
  //     });
  //     console.log('Product added to Firestore');
  //   } catch (error) {
  //     console.error('Error adding document: ', error);
  //   }
  // };
  // //

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  // // 컴포넌트 마운트 시 데이터 가져오기
  // useEffect(() => {
  //   fetchViewedData();
  // }, [fetchViewedData]);

  // 테스트
  // user 데이터를 FireStore에 전송
  const handleAddToMyProducts = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      // 'myViewed' 컬렉션에서 해당 사용자 문서 참조
      const userDoc = doc(collection(db, 'myViewed'), user.uid);

      // Firestore에서 고유 ID 생성
      const productId6 = doc(collection(db, 'myViewed')).id;
      const productId7 = doc(collection(db, 'myViewed')).id;
      const productId8 = doc(collection(db, 'myViewed')).id;
      const productId9 = doc(collection(db, 'myViewed')).id;
      const productId10 = doc(collection(db, 'myViewed')).id;

      // 사용자 데이터에 고유 ID를 가진 브랜드 추가
      await setDoc(userDoc, {
        uid: user.uid,
        [productId6]: {
          brand: 'Nike',
          image: 'https://image.a-rt.com/art/product/2022/01/60008_1642143249212.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010087307&page=1',
          modelName: '우먼스 나이키 코트 비전 알타 레더',
          price: 59000,
          sizeRecommend: '245mm',
          timestamp: '',
        },
        [productId7]: {
          brand: 'Vans',
          image: 'https://image.a-rt.com/art/product/2024/01/97399_1704875453756.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010104029&page=1',
          modelName: '어센틱 - 컬러 띠어리 아이스버그 그린',
          price: 95000,
          sizeRecommend: '240mm',
        },
        [productId8]: {
          brand: 'Vans',
          image: 'https://image.a-rt.com/art/product/2024/03/20487_1709622787180.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010105228&page=1',
          modelName: '올드 스쿨 - 스레디드 데님 블루/화이트',
          price: 95000,
          sizeRecommend: '240mm',
        },
        [productId9]: {
          brand: 'Adidas',
          image: 'https://image.a-rt.com/art/product/2024/09/76112_1725849859140.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010109169&page=1',
          modelName: '핸드볼 스페지알 우먼스',
          price: 139000,
          sizeRecommend: '235mm',
        },
        [productId10]: {
          brand: 'Crocs',
          image: 'https://image.a-rt.com/art/product/2023/06/21029_1688017391942.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010100080&page=1',
          modelName: '듀엣 맥스 II 클로그',
          price: 79900,
          sizeRecommend: '245mm',
        },
      });

      // Firestore에서 데이터를 다시 가져와서 상태 업데이트
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProductsData(data?.products || {});
      } else {
        console.log('No document found');
      }

      console.log('Products and brands added to Firestore');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // 컴포넌트 마운트 시 Firestore에 데이터 추가
  useEffect(() => {
    handleAddToMyProducts();
  }, []);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

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
