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
import { back_arrow } from '../../assets/assets';
import useUserStore from '../../stores/useUserStore';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { LIKED_COLLECTION, VIEWED_COLLECTION, db } from '../../firebase/firebase';

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
  // 탭메뉴 상태관리
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  // 상품카드 상태관리
  const [productsData, setProductsData] = useState<{ [key: string]: Product }>({});
  const { user } = useUserStore();

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  // user 데이터를 FireStore에 전송
  const handleAddToMyProducts = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      // 'myViewed' 컬렉션에서 해당 사용자 문서 참조
      const userDoc = doc(VIEWED_COLLECTION, user.uid);

      // Firestore에서 기존 데이터를 가져옴
      const docSnap = await getDoc(userDoc);

      // docSnap.exists()로 Firestore에 데이터가 있는지 확인한 후, 데이터가 없을 경우에만 목데이터를 추가
      // if (docSnap.exists()) {
      //   console.log('Firestore에 이미 데이터가 존재합니다.');
      //   const data = docSnap.data();
      //   setProductsData(data?.products || {});
      //   return; // 데이터가 이미 있으므로 추가하지 않음
      // }

      // Firestore에서 고유 ID 생성
      const productId6 = doc(collection(db, 'myViewed')).id;
      const productId7 = doc(collection(db, 'myViewed')).id;
      const productId8 = doc(collection(db, 'myViewed')).id;
      const productId9 = doc(collection(db, 'myViewed')).id;

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
        [productId8]: {
          brand: 'Vans',
          image: 'https://image.a-rt.com/art/product/2024/01/48875_1706597710426.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010104561&page=1',
          modelName: '어센틱 - 체커보드 블랙/화이트',
          price: 75000,
          sizeRecommend: '240mm',
        },
        [productId9]: {
          brand: 'Vans',
          image: 'https://image.a-rt.com/art/product/upload/VN0A3MUS6BT_BLACK%2BTRUE%20WHITE/S1.jpg?shrink=580:580',
          link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010063447&page=1',
          modelName: '올드 스쿨 뮬 - 블랙/트루 화이트',
          price: 85000,
          sizeRecommend: '240mm',
        },
      };

      // docSnap.exists()로 Firestore에 데이터가 있는지 확인한 후, 데이터가 없을 경우에만 목데이터를 추가
      if (docSnap.exists()) {
        console.log('Firestore에 이미 데이터가 존재합니다.');
        const data = docSnap.data();
        const productsData = data?.products || {}; // 기존 products 데이터를 가져옴

        // products 필드가 존재하지 않거나 비어있을 경우 목데이터 추가
        if (Object.keys(productsData).length === 0) {
          console.log('products 필드가 비어있습니다. 목데이터를 추가합니다.');
          await setDoc(
            userDoc,
            {
              uid: user.uid,
              products: updatedProducts,
            },
            { merge: true }
          );
          console.log('products 목데이터가 추가되었습니다.');
        } else {
          console.log('products 필드에 데이터가 이미 있습니다.');
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
      } else {
        console.log('No document found');
      }

      // Firestore에서 데이터를 다시 가져와서 상태 업데이트
      // const docSnap = await getDoc(userDoc);
      // if (docSnap.exists()) {
      //   const data = docSnap.data();
      //   setProductsData(data?.products || {});
      // } else {
      //   console.log('No document found');
      // }

      console.log('Products and brands added to Firestore');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // 최근본=>좋아요로 옮기는 기능
  // myViewed에서 하트 클릭 시 product를 가져와 myLiked로 옮기는 함수 (timestamp 추가 포함)
  const moveProductFromViewedToLiked = async (userId: string, productId: string) => {
    try {
      // 'myViewed' 컬렉션에서 해당 사용자의 문서 참조
      const viewedDocRef = doc(VIEWED_COLLECTION, userId);
      const viewedDocSnap = await getDoc(viewedDocRef);

      if (viewedDocSnap.exists()) {
        const viewedData = viewedDocSnap.data();

        // viewedData에서 특정 productId의 데이터 가져오기
        const productData = viewedData?.products?.[productId];

        if (productData) {
          // 'myLiked' 컬렉션에서 해당 사용자의 문서 참조
          const likedDocRef = doc(LIKED_COLLECTION, userId);

          // 현재 시간을 timestamp로 기록
          const timestamp = new Date().toISOString();

          // 기존 productData에 timestamp 필드 추가
          const updatedProductData = {
            ...productData,
            timestamp: timestamp,
          };

          // 'myLiked' 문서에 해당 product 추가
          await updateDoc(likedDocRef, {
            [`products.${productId}`]: updatedProductData,
          });

          console.log(`Product ${productId} moved from myViewed to myLiked.`);
        } else {
          console.log(`Product ${productId} not found in myViewed.`);
        }
      } else {
        console.log('myViewed 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('Error moving product:', error);
    }
  };

  // 최근본 기능
  // 카드 클릭 시 timestamp를 기록하는 함수
  const handleCardClick = async (productId: string) => {
    if (!user?.uid) {
      console.log('User가 없습니다.');
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

      console.log(`Timestamp for product ${productId} 저장 성공:`, timestamp);
    } catch (error) {
      console.error('Timestamp 저장 실패:', error);
    }
  };

  //
  // 컴포넌트 마운트 시 Firestore에 데이터 추가
  useEffect(() => {
    handleAddToMyProducts();
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
                  isHeartFilled={false}
                  product={{
                    ...product,
                    brand: product.brand || 'Unknown Brand', // brand가 없을 경우 기본 값 할당
                  }}
                  moveHeartProduct={moveProductFromViewedToLiked} // moveHeartProduct 함수 전달
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
