import { back_arrow } from '../../../assets/assets';
import Header from '../../../components/common/header/Header';
import SizeRecommendationCard from '../../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsAndBrandsQuantity,
  filterProductsAndBrandsQuantityBox,
  likedAndViewedHistoryCointainer,
  likedAndViewedHistoryItemBox,
  likedInBrandsItemBox,
} from './likedPage.css';
import LikedAndViewedHistoryButton from '../../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { useEffect, useState } from 'react';
import ProductAndBrandButton from '../../../components/mypage/product-and-brand-button/ProductAndBrandButton';
import LikedInBrand from '../../../components/mypage/liked-in-brand/LikedInBrand';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import useUserStore from '../../../stores/useUserStore';
import LoadingPage from '../../loading-page/loadingPage';
import useMyLikedBrandStore from '../../../stores/useMyLikedBrandStore';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';

// Firebase 초기화
const storage = getStorage();

const LikedPage = () => {
  // 탭메뉴 상태관리
  const [likedOrViewed, setLikedOrViewed] = useState('좋아요');
  const [productOrBrand, setProductOrBrand] = useState('상품');
  // UseUserStore로부터 유저 정보 가져오기
  const { user } = useUserStore();
  // 상품카드 상태관리 - zustand
  const { productsData, deleteProduct, fetchProductsData, handleCardClick, handleProductHeartChecked } =
    useMyLikedProductStore();
  // 브랜드 상태관리 - zustand
  const { brandsData, fetchBrandsData } = useMyLikedBrandStore();
  // 브랜드로고 이미지 상태관리 - 파이어베이스의 스토리지에 담은 이미지를 가져와야 해서 별도 처리
  const [logos, setLogos] = useState<{ [key: string]: string }>({}); // 브랜드 이름과 로고 URL을 매핑하는 객체
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    if (user?.uid) {
      fetchProductsData(user.uid); // liked 상품 데이터 가져오기
      fetchBrandsData(user.uid);
    }
  }, [user?.uid]);

  useEffect(() => {
    // firebase storage의 'logos' 폴더 안의 파일 목록 가져오기
    const fetchLogos = async () => {
      const logosRef = ref(storage, 'logos');
      const result = await listAll(logosRef);
      const logoPromises = result.items.map(async item => {
        const url = await getDownloadURL(item);
        return {
          name: item.name.replace('.svg', ''), // 파일 이름에서 확장자 제거
          url: url,
        };
      });
      const logoList = await Promise.all(logoPromises);
      // 브랜드 이름을 키로 로고 URL을 값으로 갖는 객체 생성
      const logoMap = logoList.reduce((acc, logo) => {
        acc[logo.name] = logo.url;
        return acc;
      }, {} as { [key: string]: string });
      setLogos(logoMap);
      setIsLoading(false); // 로딩 상태 해제
    };

    fetchLogos();
  }, []);

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  const handleProductOrBrandChange = (buttonType: string) => {
    setProductOrBrand(buttonType);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (productId) {
      try {
        const userId = user?.uid;
        if (!userId) return;

        await deleteProduct(userId, productId); // Zustand에서 상품 삭제 함수 호출
      } catch (error) {
        alert('handleDeleteProduct 에러');
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <section className={likedAndViewedHistoryCointainer}>
        <Header imageSrc={back_arrow} alt="back arrow" nav="/my" />

        <LikedAndViewedHistoryButton handleClick={handleLikedOrViewedChange} activeTab={likedOrViewed} />

        {likedOrViewed === '좋아요' && (
          <ProductAndBrandButton handleClick={handleProductOrBrandChange} activeTab={productOrBrand} />
        )}
        <article className={filterProductsAndBrandsQuantityBox}>
          {productOrBrand === '상품' ? (
            <div className={filterProductsAndBrandsQuantity}>
              {productsData ? Object.keys(productsData).length : 0}개
            </div>
          ) : (
            productOrBrand === '브랜드' && (
              <div className={filterProductsAndBrandsQuantity}>{brandsData ? Object.keys(brandsData).length : 0}개</div>
            )
          )}
        </article>

        {productOrBrand === '상품' && (
          <article className={likedAndViewedHistoryItemBox}>
            {productsData && Object.keys(productsData).length > 0 ? (
              Object.entries(productsData)
                // .sort(([, a], [, b]) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()) // 클릭 시간으로 정렬
                .sort(([, a], [, b]) => {
                  const timestampA = a?.timestamp ? new Date(a.timestamp).getTime() : 0; // null 또는 undefined일 때 기본값 0
                  const timestampB = b?.timestamp ? new Date(b.timestamp).getTime() : 0; // null 또는 undefined일 때 기본값 0
                  return timestampB - timestampA; // 최신순으로 정렬
                })
                .map(([productId, product]) => {
                  return (
                    <SizeRecommendationCard
                      onCardClick={() => handleCardClick(user?.uid || '', productId)} // 카드 클릭 시 호출
                      key={productId}
                      isHeartFilled={product?.isLiked || false} // product가 null일 수 있으므로 안전하게 처리
                      product={product} // TProduct 타입 전달
                      moveHeartProduct={(productId, checked) =>
                        handleProductHeartChecked(user?.uid || '', productId, checked)
                      } // 하트 상태 변경 함수 전달
                      userId={user?.uid || ''} // 현재 사용자의 uid 전달
                      productId={productId} // productId도 props로 전달
                      onDelete={handleDeleteProduct} // productId를 전달
                    />
                  );
                })
            ) : (
              <></> // productsData가 비어 있을 때 메시지 출력
            )}
          </article>
        )}
        {/* // 로고와 브랜드 데이터가 로딩되었을 때 */}
        {productOrBrand === '브랜드' && (
          <article className={likedInBrandsItemBox}>
            {brandsData && Object.keys(brandsData).length > 0 ? (
              Object.entries(brandsData)
                .sort(([, brandA], [, brandB]) => (brandA.brandNameEn || '').localeCompare(brandB.brandNameEn || '')) // 브랜드 이름 기준으로 정렬
                .map(([key, brand]) => {
                  return (
                    <LikedInBrand
                      key={key}
                      isHeartFilled
                      brand={{
                        ...brand,
                        brandId: brand.brandId || key, // brandId가 없으면 key 사용
                      }}
                      logos={logos[brand.brandNameEn?.toLowerCase() || '']} // 브랜드 이름이 없으면 빈 문자열을 기본값으로 사용
                    />
                  );
                })
            ) : (
              <></> // brandsData가 비어 있을 때 메시지 출력
            )}
          </article>
        )}
      </section>
    </>
  );
};

export default LikedPage;
