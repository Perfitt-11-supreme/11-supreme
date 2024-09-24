import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { heart_filled, heart_empty } from '../../../assets/assets';
import {
  brandListBox,
  brandLists,
  brandNameBox,
  brandsContainer,
  heartFilledIcon,
  logoUrlNone,
  logoUrlNoneText,
} from './likedInBrand.css';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

type Brand = {
  brandNameEn: string;
  brandNameKo: string;
  logoImage?: string;
};
type LikedInBrandProps = {
  brands: {
    [key: string]: Brand;
  };
};

// Firebase 초기화
const db = getFirestore();
const storage = getStorage();

const LikedInBrand = ({ brands }: LikedInBrandProps) => {
  const [logos, setLogos] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [heartStates, setHeartStates] = useState<{ [key: string]: boolean }>({}); // 각 브랜드의 하트 상태 관리

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
      setIsLoading(false); // 로고 데이터를 다 불러오면 로딩 상태 해제
    };

    fetchLogos();
  }, []);

  // 브랜드 이름과 로고를 매칭하는 함수
  const getLogoUrl = (brandNameEn: string) => {
    const logo = logos.find(logo => logo.name.toLowerCase() === brandNameEn.toLowerCase());
    return logo ? logo.url : ''; // 로고가 없을 경우 빈 문자열 반환
  };

  // 브랜드의 초기 하트 상태를 설정
  useEffect(() => {
    const initialHeartStates: { [key: string]: boolean } = {};
    Object.keys(brands).forEach(brandKey => {
      initialHeartStates[brandKey] = true; // 기본적으로 heart_filled 상태로 설정
    });
    setHeartStates(initialHeartStates);
  }, [brands]);

  // Firestore에서 브랜드 삭제
  const handleDeleteBrand = async (brandKey: string) => {
    try {
      const docRef = doc(db, 'myproducts', 'FS7MVRUbVXZ9j6GZnrbF'); // 문서 참조
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log('myproducts 문서가 존재하지 않음');
        return;
      }

      const data = docSnap.data();
      const likedData = data?.liked;

      if (!likedData || !likedData.brands) {
        console.log('Firestore liked 필드 또는 brands 필드가 존재하지 않음');
        return;
      }

      const updatedBrands = { ...likedData.brands };
      if (!(brandKey in updatedBrands)) {
        console.log('해당 브랜드가 Firestore liked.brands에 존재하지 않음');
        return;
      }

      delete updatedBrands[brandKey]; // 상태에서 해당 브랜드 삭제

      await updateDoc(docRef, {
        'liked.brands': updatedBrands, // 업데이트된 brands 저장
      });

      console.log('Brand deleted successfully from Firestore');
    } catch (error) {
      console.error('Error deleting brand from Firestore:', error);
    }
  };

  // 하트 상태를 토글하는 함수
  const toggleHeart = (brandKey: string) => {
    setHeartStates(prevState => ({
      ...prevState,
      [brandKey]: !prevState[brandKey], // 해당 브랜드의 하트 상태를 토글
    }));
  };

  return (
    <>
      <section className={brandsContainer}>
        {Object.keys(brands).map(brandKey => {
          const brand = brands[brandKey];
          const logoUrl = getLogoUrl(brand.brandNameEn);

          return (
            <article key={brandKey} className={brandLists}>
              <div className={brandListBox}>
                {/* <img src={logoUrl || `<div>s</div>`} alt={`${brand.brandNameEn} logo`} width="75" height="75" /> */}
                {logoUrl ? (
                  <img src={logoUrl} alt={`${brand.brandNameEn} logo`} width="75" height="75" />
                ) : (
                  <div className={logoUrlNone}>
                    <span className={logoUrlNoneText}>No Image</span>
                  </div>
                )}
                <div className={brandNameBox}>
                  <strong>{brand.brandNameEn}</strong>
                  <p>{brand.brandNameKo}</p>
                </div>
              </div>
              <div>
                <img
                  className={heartFilledIcon}
                  src={heartStates[brandKey] ? heart_filled : heart_empty} // 하트 상태에 따라 아이콘 변경
                  alt="heart"
                  onClick={() => toggleHeart(brandKey)} // 클릭 시 하트 상태 토글
                />
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default LikedInBrand;
