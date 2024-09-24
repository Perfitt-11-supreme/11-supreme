import { back_arrow } from '../../assets/assets';
import Header from '../../components/common/header/Header';
import SizeRecommendationCard from '../../components/mypage/size-recommendation-card/SizeRecommendationCard';
import {
  filterProductsAndBrandsQuantity,
  filterProductsAndBrandsQuantityBox,
  likedAndViewedHistoryCointainer,
  likedAndViewedHistoryItemBox,
  likedInBrandsItemBox,
} from './likedPage.css';
import LikedAndViewedHistoryButton from '../../components/mypage/liked-and-viewed-history-button/LikedAndViewedHistoryButton';
import { useEffect, useState } from 'react';
import ProductAndBrandButton from '../../components/mypage/product-and-brand-button/ProductAndBrandButton';
import LikedInBrand from '../../components/mypage/liked-in-brand/LikedInBrand';
import { responsiveBox } from '../../styles/responsive.css';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { useLikedStore } from '../../stores/useLikedStore';

// Firebase 초기화
const storage = getStorage();

const LikedPage = () => {
  // const [productsData, setProductsData] = useState<LikedData['products']>({});
  const [likedOrViewed, setLikedOrViewed] = useState('좋아요');
  const [productOrBrand, setProductOrBrand] = useState('상품');
  // const [brandsData, setBrandsData] = useState<LikedData['brands'] | null>(null);
  const [logos, setLogos] = useState<{ name: string; url: string }[]>([]); // 브랜드 필터링
  // Zustand store에서 데이터와 메서드 가져오기
  const { productsData, brandsData, fetchLikedData, handleDeleteProduct, handleDeleteBrand } = useLikedStore();

  useEffect(() => {
    fetchLikedData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

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
      setLogos(logoList);
    };

    fetchLogos();
  }, []);

  const handleLikedOrViewedChange = (buttonType: string) => {
    setLikedOrViewed(buttonType);
  };

  const handleProductOrBrandChange = (buttonType: string) => {
    setProductOrBrand(buttonType);
  };

  return (
    <>
      <section className={likedAndViewedHistoryCointainer}>
        <Header imageSrc={back_arrow} alt="back arrow" nav="/mypage" />

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
                <div className={filterProductsAndBrandsQuantity}>
                  {brandsData ? Object.keys(brandsData).length : 0}개
                </div>
              )
            )}
          </article>

          {productOrBrand === '상품' && (
            <article className={likedAndViewedHistoryItemBox}>
              {productsData && Object.keys(productsData).length > 0 ? (
                Object.entries(productsData).map(([key, product]) => {
                  return (
                    <SizeRecommendationCard
                      key={key}
                      isHeartFilled
                      product={{
                        ...product,
                        productId: product.productId || key, // productId가 없으면 key 사용
                        brand: product.brand || 'Unknown Brand', // brand가 없으면 기본 값 할당
                      }}
                      onDelete={handleDeleteProduct}
                    />
                  );
                })
              ) : (
                <></> // productsData가 비어 있을 때 메시지 출력
              )}
            </article>
          )}

          {productOrBrand === '브랜드' && (
            <article className={likedInBrandsItemBox}>
              {brandsData && Object.keys(brandsData).length > 0 ? (
                Object.entries(brandsData).map(([key, brand]) => {
                  return (
                    <LikedInBrand
                      key={key}
                      isHeartFilled
                      brand={{
                        ...brand,
                        brandId: brand.brandId || key, // brandId가 없으면 key 사용
                        // brand: brand.brand || 'Unknown Brand', // brand가 없으면 기본 값 할당
                      }}
                      onDelete={handleDeleteBrand}
                      logos={logos}
                    />
                  );
                })
              ) : (
                <></> // brandsData가 비어 있을 때 메시지 출력
              )}
            </article>
          )}
        </section>
      </div>
    </>
  );
};

export default LikedPage;
