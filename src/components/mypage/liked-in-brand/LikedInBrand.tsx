import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { heart_filled } from '../../../assets/assets';
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
const storage = getStorage();

const LikedInBrand = ({ brands }: LikedInBrandProps) => {
  const [logos, setLogos] = useState<{ name: string; url: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

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
                <img className={heartFilledIcon} src={heart_filled} alt="heart_filled" />
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default LikedInBrand;
