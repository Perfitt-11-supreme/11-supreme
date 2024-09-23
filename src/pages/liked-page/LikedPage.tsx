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

  // Firestore에서 liked 필드 데이터를 가져오기
  const fetchLikedData = async () => {
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF'); // liked는 문서의 필드
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data(); // 문서의 데이터를 가져옴
        const likedData = data?.liked; // liked 필드에 접근
        console.log('Firestore liked data:', likedData); // Firestore에서 가져온 liked 필드 확인

        if (likedData && likedData.products && Object.keys(likedData.products).length > 0) {
          setProductsData(likedData.products); // 비어있지 않은 경우에만 상태 업데이트
        } else {
          console.log('No products found in Firestore liked field');
          setProductsData({}); // 비어있을 때 빈 객체 설정
        }

        if (likedData.brands && Object.keys(likedData.brands).length > 0) {
          setBrandsData(likedData.brands); // brands 상태 업데이트
        } else {
          console.log('No brands found in Firestore liked field');
          setBrandsData(null); // 비어있을 때 null로 설정
        }
      } else {
        console.log('myproducts 문서가 존재하지 않음');
        setProductsData({}); // 문서가 없을 때 빈 객체 설정
        setBrandsData(null); // 문서가 없을 때 빈 객체로 설정
      }
    } catch (error) {
      console.error('Error fetching Firestore data:', error);
      setProductsData({}); // 에러 발생 시에도 빈 객체 설정
      setBrandsData(null); // 문서가 없을 때 빈 객체로 설정
    }
  };

  useEffect(() => {
    fetchLikedData(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  // 브랜드 필터링
  const [logos, setLogos] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    // 'logos' 폴더 안의 파일 목록 가져오기
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

  // 브랜드 이름과 로고를 매칭하는 함수
  const getLogoUrl = (brandNameEn: string) => {
    const logo = logos.find(logo => logo.name.toLowerCase() === brandNameEn.toLowerCase());
    return logo ? logo.url : ''; // 로고가 없을 경우 빈 문자열 반환
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
