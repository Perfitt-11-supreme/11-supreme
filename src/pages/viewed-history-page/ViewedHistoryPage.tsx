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
import { useEffect, useState } from 'react';
import { responsiveBox } from '../../styles/responsive.css';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

type Product = {
  brand?: string;
  image: string;
  link: string;
  modelName: string;
  price: number;
  sizeRecommend: string;
  uid: string;
};

type ViewedData = {
  products: {
    [key: string]: Product;
  };
};

const ViewedHistoryPage = () => {
  const [likedOrViewed, setLikedOrViewed] = useState('최근 본');
  const [productsData, setProductsData] = useState<ViewedData['products']>({});

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  // Firestore에서 viewedHistory 필드 데이터를 가져오기
  const fetchViewedData = async () => {
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF'); // Firestore 문서 참조
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data(); // 문서의 데이터를 가져옴
        const viewedData = data?.viewedHistory; // 'viewedHistory' 필드에 접근

        if (viewedData && Object.keys(viewedData).length > 0) {
          setProductsData(viewedData); // 비어있지 않은 경우에만 상태 업데이트
        } else {
          console.log('No products found in Firestore viewedHistory field');
          setProductsData({}); // 비어있을 때 빈 객체 설정
        }
      } else {
        console.log('myproducts 문서가 존재하지 않음');
        setProductsData({}); // 문서가 없을 때 빈 객체 설정
      }
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      setProductsData({}); // 에러 발생 시에도 빈 객체 설정
    }
  };

  useEffect(() => {
    fetchViewedData(); // 컴포넌트 마운트 시 데이터 가져오기
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
              Object.entries(productsData).map(([key, product]) => (
                <SizeRecommendationCard
                  key={key}
                  isHeartFilled={false} // `좋아요` 상태가 아니므로 빈 하트로 설정
                  product={{
                    ...product,
                    brand: product.brand || 'Unknown Brand', // brand가 없을 경우 기본 값 할당
                  }}
                />
              ))
            ) : (
              <></> // productsData가 비어 있을 때 메시지 출력
            )}
          </article>
        </section>
      </div>
    </>
  );
};

export default ViewedHistoryPage;
