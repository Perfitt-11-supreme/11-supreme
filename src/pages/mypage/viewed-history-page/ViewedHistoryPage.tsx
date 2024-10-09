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
import { collection, deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LIKED_COLLECTION, VIEWED_COLLECTION, db } from '../../../firebase/firebase';

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

  // Firestore에서 'myViewed' 컬렉션 데이터 가져오기 - 하트상태 firestore에 저장을
  // user 데이터를 FireStore에 전송 으로 바꿔야함.
  const fetchViewedProducts = async () => {
    if (!user) return;

    try {
      // 'myViewed' 컬렉션에서 해당 사용자 문서 참조
      const userDoc = doc(VIEWED_COLLECTION, user.uid);
      const docSnap = await getDoc(userDoc);

      // Firestore에서 고유 ID 생성
      const productId6 = doc(collection(db, 'myViewed')).id;
      const productId7 = doc(collection(db, 'myViewed')).id;

      // 기존 데이터와 병합하여 products 업데이트
      const updatedProducts = {
        [productId6]: {
          brand: 'Converse',
          image: 'https://image.a-rt.com/art/product/upload3/M9166C_Black/S1.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010043164',
          modelName: '척테일러 올스타 블랙',
          price: 55000,
          sizeRecommend: '240mm',
          timestamp: '',
        },
        [productId7]: {
          brand: 'Nike',
          image: 'https://image.a-rt.com/art/product/2024/04/49929_1714454204500.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010105391&page=1',
          modelName: '코트 버로우 로우 리크래프트 보이그레이드',
          price: 69000,
          sizeRecommend: '245mm',
        },
      };

      // docSnap.exists()로 Firestore에 데이터가 있는지 확인한 후, 데이터가 없을 경우에만 목데이터를 추가
      if (docSnap.exists()) {
        const data = docSnap.data();
        const productsData = data?.products || {}; // 기존 products 데이터를 가져옴
        // setProductsData(docSnap.data()?.products || {});

        // products 필드가 존재하지 않거나 비어있을 경우 목데이터 추가
        if (Object.keys(productsData).length === 0) {
          await setDoc(
            userDoc,
            {
              uid: user.uid,
              products: updatedProducts,
            },
            { merge: true }
          );
        } else {
          setProductsData(productsData); // 이미 있는 데이터를 상태에 설정
        }
        return;
      }

      // Firestore에 업데이트
      await setDoc(
        userDoc,
        {
          uid: user.uid,
          products: updatedProducts,
        },
        { merge: true } // 병합 옵션 추가
      );

      // Firestore에서 데이터를 다시 가져와서 상태 업데이트
      const updatedDocSnap = await getDoc(userDoc);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setProductsData(updatedData?.products || {});
      }
    } catch (error) {
      alert('fetchViewedProducts 에러');
    }
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
