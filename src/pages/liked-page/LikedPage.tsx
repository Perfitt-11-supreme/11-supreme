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
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import useUserStore from '../../stores/useUserStore';
import { deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import LoadingPage from '../loading-page/loadingPage';
import { LIKED_COLLECTION } from '../../firebase/firebase';

// Firebase 초기화
const storage = getStorage();

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

type Brand = {
  brandNameEn: string;
  brandNameKo: string;
  logoImage?: string;
  brandId?: string;
  timestamp?: string; // 클릭한 시간을 기록하는 필드
  logos?: string;
};

const LikedPage = () => {
  // 탭메뉴 상태관리
  const [likedOrViewed, setLikedOrViewed] = useState('좋아요');
  const [productOrBrand, setProductOrBrand] = useState('상품');
  // 상품카드 상태관리
  const [productsData, setProductsData] = useState<{ [key: string]: Product }>({});
  const [brandsData, setBrandsData] = useState<{ [key: string]: Brand }>({});
  // 브랜드로고 상태관리
  const [logos, setLogos] = useState<{ [key: string]: string }>({}); // 브랜드 이름과 로고 URL을 매핑하는 객체
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  // UseUserStore로부터 유저 정보 가져오기
  const { user } = useUserStore();

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

  // Firebase Storage에서 로고 URL을 가져오는 함수
  const fetchLogoURL = async (logoPath: string) => {
    try {
      const imageRef = ref(storage, logoPath);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error('Error fetching logo image URL:', error);
      return null;
    }
  };

  // user 데이터를 FireStore에 전송
  const handleAddToMyProducts = async () => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    try {
      // 'myLiked' 컬렉션에서 해당 사용자 문서 참조
      const userDoc = doc(LIKED_COLLECTION, user.uid);

      // Firestore에서 고유 ID 생성
      const nike = doc(LIKED_COLLECTION).id;
      const adidas = doc(LIKED_COLLECTION).id;
      const crocs = doc(LIKED_COLLECTION).id;
      const productId1 = doc(LIKED_COLLECTION).id;
      const productId2 = doc(LIKED_COLLECTION).id;
      const productId3 = doc(LIKED_COLLECTION).id;
      const productId4 = doc(LIKED_COLLECTION).id;
      const productId5 = doc(LIKED_COLLECTION).id;

      // Firebase Storage에서 브랜드 로고 URL 가져오기
      const nikeLogoURL = await fetchLogoURL('logos/nike.svg');
      const adidasLogoURL = await fetchLogoURL('logos/adidas.svg');
      const crocsLogoURL = await fetchLogoURL('logos/crocs.svg');

      // 사용자 데이터에 고유 ID를 가진 브랜드 추가
      await setDoc(userDoc, {
        uid: user.uid,
        brands: {
          [nike]: {
            brandNameEn: 'NIKE',
            brandNameKo: '나이키',
            logoImage: nikeLogoURL,
          },
          [adidas]: {
            brandNameEn: 'ADIDAS',
            brandNameKo: '아디다스',
            logoImage: adidasLogoURL,
          },
          [crocs]: {
            brandNameEn: 'CROCS',
            brandNameKo: '크록스',
            logoImage: crocsLogoURL,
          },
        },
        products: {
          [productId1]: {
            brand: 'Nike',
            image: 'https://image.a-rt.com/art/product/2022/01/60008_1642143249212.jpg?shrink=580:580',
            link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010087307&page=1',
            modelName: '우먼스 나이키 코트 비전 알타 레더',
            price: 59000,
            sizeRecommend: '245mm',
            timestamp: '',
          },
          [productId2]: {
            brand: 'Vans',
            image: 'https://image.a-rt.com/art/product/2024/01/97399_1704875453756.jpg?shrink=580:580',
            link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010104029&page=1',
            modelName: '어센틱 - 컬러 띠어리 아이스버그 그린',
            price: 95000,
            sizeRecommend: '240mm',
          },
          [productId3]: {
            brand: 'Vans',
            image: 'https://image.a-rt.com/art/product/2024/03/20487_1709622787180.jpg?shrink=580:580',
            link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010105228&page=1',
            modelName: '올드 스쿨 - 스레디드 데님 블루/화이트',
            price: 95000,
            sizeRecommend: '240mm',
          },
          [productId4]: {
            brand: 'Adidas',
            image: 'https://image.a-rt.com/art/product/2024/09/76112_1725849859140.jpg?shrink=580:580',
            link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010109169&page=1',
            modelName: '핸드볼 스페지알 우먼스',
            price: 139000,
            sizeRecommend: '235mm',
          },
          [productId5]: {
            brand: 'Crocs',
            image: 'https://image.a-rt.com/art/product/2023/06/21029_1688017391942.jpg?shrink=580:580',
            link: 'https://abcmart.a-rt.com/product/new?prdtNo=1010100080&page=1',
            modelName: '듀엣 맥스 II 클로그',
            price: 79900,
            sizeRecommend: '245mm',
          },
        },
      });

      // Firestore에서 데이터를 다시 가져와서 상태 업데이트
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBrandsData(data?.brands || {});
        setProductsData(data?.products || {});
      } else {
        console.log('No document found');
      }

      console.log('Products and brands added to Firestore');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // Firestore에서 데이터 삭제 성공
  const deleteLikedData = async (productId: string) => {
    try {
      // Firestore 문서의 'liked.products' 필드에서 productId에 해당하는 필드 삭제
      const docRef = doc(LIKED_COLLECTION, user?.uid);

      await updateDoc(docRef, {
        [`products.${productId}`]: deleteField(),
      });
      console.log('Firestore에서 필드 삭제 성공:', productId);
    } catch (e) {
      console.error('Firestore에서 필드 삭제 에러: ', e);
    }
  };

  // 상품 삭제 처리 함수
  const handleDeleteProduct = async (productId: string) => {
    if (productId) {
      try {
        // Firestore에서 products 필드 안의 특정 productId 삭제
        await deleteLikedData(productId);

        console.log('Firestore에서 상품 삭제 완료:', productId);

        // 상태 업데이트 - 삭제된 상품을 제외한 나머지 productsData로 업데이트
        const updatedProducts = { ...productsData };
        delete updatedProducts[productId]; // 삭제된 상품을 상태에서 제거
        setProductsData(updatedProducts); // 상태 업데이트
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.error('productId가 정의되지 않았습니다.');
    }
  };

  // 컴포넌트 마운트 시 Firestore에 데이터 추가
  useEffect(() => {
    handleAddToMyProducts();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

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
              <div className={filterProductsAndBrandsQuantity}>{brandsData ? Object.keys(brandsData).length : 0}개</div>
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
                .sort(([, brandA], [, brandB]) => brandA.brandNameEn.localeCompare(brandB.brandNameEn)) // 브랜드 이름 기준으로 정렬
                .map(([key, brand]) => {
                  return (
                    <LikedInBrand
                      key={key}
                      isHeartFilled
                      brand={{
                        ...brand,
                        brandId: brand.brandId || key, // brandId가 없으면 key 사용
                      }}
                      logos={logos[brand.brandNameEn.toLowerCase()]} // 브랜드 이름에 맞는 로고 URL 전달
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
