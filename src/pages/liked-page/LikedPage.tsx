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
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';

type Brand = {
  brandNameEn: string;
  brandNameKo: string;
  logoImage?: string;
};

type Product = {
  brand?: string;
  image: string;
  link: string;
  modelName: string;
  productId?: string;
  price: number;
  sizeRecommend: string;
  uid: string;
};

type LikedData = {
  brands: {
    adidas: Brand;
    crocs: Brand;
    nike: Brand;
  };
  products: {
    [key: string]: Product;
  };
};

// Firebase 초기화
const db = getFirestore();
const storage = getStorage();

const LikedPage = () => {
  const [productsData, setProductsData] = useState<LikedData['products']>({});
  const [likedOrViewed, setLikedOrViewed] = useState('좋아요');
  const [productOrBrand, setProductOrBrand] = useState('상품');
  const [brandsData, setBrandsData] = useState<LikedData['brands'] | null>(null);

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

  // Firestore에서 제품 삭제
  const handleDeleteProduct = async (id: string) => {
    try {
      // Firestore에서 liked 필드가 있는지 먼저 확인
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF');
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('myproducts 문서가 존재하지 않음');
        return; // 문서가 존재하지 않으면 중단
      }

      const data = docSnap.data();
      const likedData = data?.liked; // liked 필드에 접근
      console.log('Firestore liked data delete:', likedData); // Firestore에서 가져온 liked 필드 확인

      if (!likedData || !likedData.products) {
        console.log('Firestore liked 필드 또는 products 필드가 존재하지 않음');
        return; // liked나 products 필드가 없으면 중단
      }

      const updatedProducts = { ...likedData.products };
      if (!(id in updatedProducts)) {
        console.log('해당 ID를 가진 제품이 Firestore liked.products에 존재하지 않음');
        return; // 삭제할 제품이 존재하지 않으면 중단
      }

      delete updatedProducts[id]; // 상태에서 해당 제품 삭제

      // Firestore에서 제품 삭제
      await updateDoc(docRef, {
        'liked.products': updatedProducts, // 업데이트된 products 저장
      });

      // 상태 업데이트
      setProductsData(updatedProducts);

      console.log('Product deleted successfully from Firestore');
    } catch (error) {
      console.error('Error deleting product from Firestore:', error);
    }
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
                  // console.log('Rendering product:', product); // 각 product가 렌더링될 때 출력
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
                <LikedInBrand brands={brandsData} /> // 전체 brands 객체를 LikedInBrand에 전달
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
