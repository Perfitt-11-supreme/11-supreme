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
import { LIKED_COLLECTION, VIEWED_COLLECTION } from '../../firebase/firebase';

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

      // Firestore에서 기존 데이터를 가져옴
      const docSnap = await getDoc(userDoc);

      // docSnap.exists()로 Firestore에 데이터가 있는지 확인한 후, 데이터가 없을 경우에만 목데이터를 추가
      // if (docSnap.exists()) {
      //   console.log('Firestore에 이미 데이터가 존재합니다.');
      //   const data = docSnap.data();
      //   setBrandsData(data?.brands || {});
      //   setProductsData(data?.products || {});
      //   return; // 데이터가 이미 있으므로 추가하지 않음
      // }

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

      // 기존 데이터와 병합하여 brands와 products 업데이트
      const updatedBrands = {
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
      };

      const updatedProducts = {
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
      };

      // docSnap.exists()로 Firestore에 데이터가 있는지 확인한 후, 데이터가 없을 경우에만 목데이터를 추가
      if (docSnap.exists()) {
        console.log('Firestore에 이미 데이터가 존재합니다.');
        const data = docSnap.data();
        const productsData = data?.products || {}; // 기존 products 데이터를 가져옴
        const brandsData = data?.brands || {}; // 기존 brands 데이터를 가져옴

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

        // brands 필드가 존재하지 않거나 비어있을 경우 목데이터 추가
        if (Object.keys(brandsData).length === 0) {
          console.log('brands 필드가 비어있습니다. 목데이터를 추가합니다.');
          await setDoc(
            userDoc,
            {
              uid: user.uid,
              brands: updatedBrands,
            },
            { merge: true }
          );
          console.log('brands 목데이터가 추가되었습니다.');
        } else {
          console.log('brands 필드에 데이터가 이미 있습니다.');
          setBrandsData(brandsData); // 이미 있는 데이터를 상태에 설정
        }
        return;
      }

      // Firestore에 업데이트
      await setDoc(
        userDoc,
        {
          uid: user.uid,
          products: updatedProducts,
          brands: updatedBrands,
        },
        { merge: true } // 병합 옵션 추가
      );

      // Firestore에서 데이터를 다시 가져와서 상태 업데이트
      const updatedDocSnap = await getDoc(userDoc);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setProductsData(updatedData?.products || {});
        setBrandsData(updatedData?.brands || {});
      } else {
        console.log('No document found');
      }

      console.log('Products and brands added to Firestore');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // Firestore에서 상품 데이터 삭제 성공
  const deleteLikedProductData = async (productId: string) => {
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
        await deleteLikedProductData(productId);

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

  // Firestore에서 브랜드 데이터 삭제 성공
  const deleteLikedBrandData = async (brandId: string) => {
    try {
      // Firestore 문서의 'liked.brands' 필드에서 brandId에 해당하는 필드 삭제
      const docRef = doc(LIKED_COLLECTION, user?.uid);

      await updateDoc(docRef, {
        [`brands.${brandId}`]: deleteField(),
      });
      console.log('Firestore에서 필드 삭제 성공:', brandId);
    } catch (e) {
      console.error('Firestore에서 필드 삭제 에러: ', e);
    }
  };

  // 브랜드 삭제 처리 함수
  const handleDeleteBrand = async (brandId: string) => {
    if (brandId) {
      try {
        // Firestore에서 brands 필드 안의 특정 brandId 삭제
        await deleteLikedBrandData(brandId);

        console.log('Firestore에서 상품 삭제 완료:', brandId);

        // 상태 업데이트 - 삭제된 상품을 제외한 나머지 brandsData로 업데이트
        const updatedBrands = { ...brandsData };
        delete updatedBrands[brandId]; // 삭제된 상품을 상태에서 제거
        setBrandsData(updatedBrands); // 상태 업데이트
      } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    } else {
      console.error('brandId가 정의되지 않았습니다.');
    }
  };

  // 좋아요=>최근본으로 옮기는 기능
  // myLiked에서 카드 클릭 시 product를 가져와 myViewed로 옮기는 함수 (timestamp 추가 포함)
  const moveProductFromLikedToViewed = async (userId: string, productId: string) => {
    try {
      // 'myLiked' 컬렉션에서 해당 사용자의 문서 참조
      const likedDocRef = doc(LIKED_COLLECTION, userId);
      const likedDocSnap = await getDoc(likedDocRef);

      if (likedDocSnap.exists()) {
        const likedData = likedDocSnap.data();

        // likedData에서 특정 productId의 데이터 가져오기
        const productData = likedData?.products?.[productId];

        if (productData) {
          // 'myViewed' 컬렉션에서 해당 사용자의 문서 참조
          const viewedDocRef = doc(VIEWED_COLLECTION, userId);

          // 현재 시간을 timestamp로 기록
          const timestamp = new Date().toISOString();

          // productData에 timestamp를 추가하고 기존 데이터를 유지
          const updatedProductData = {
            ...productData, // 기존 product 데이터 유지
            timestamp: timestamp, // 새로 추가할 timestamp
          };

          // 'myViewed' 문서에 해당 product 추가
          await updateDoc(viewedDocRef, {
            [`products.${productId}`]: updatedProductData, // 모든 product 필드가 포함된 객체 업데이트
          });

          console.log(`Product ${productId} moved from myLiked to myViewed.`);
        } else {
          console.log(`Product ${productId} not found in myLiked.`);
        }
      } else {
        console.log('myLiked 문서가 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('Error moving product:', error);
    }
  };

  // 최근본 기능 - 좋아요에서는 미완성
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
              Object.entries(productsData).map(([productId, product]) => {
                return (
                  <SizeRecommendationCard
                    onCardClick={() => {
                      handleCardClick(productId); // 클릭 시 시간 기록 함수 호출
                    }}
                    key={productId}
                    isHeartFilled
                    product={{
                      ...product,
                      productId: product.productId || productId, // productId가 없으면 key 사용
                      brand: product.brand || 'Unknown Brand', // brand가 없으면 기본 값 할당
                    }}
                    moveClickProduct={moveProductFromLikedToViewed} // moveClickProduct 함수 전달
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
                      onDelete={handleDeleteBrand} // BrandId를 전달
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
