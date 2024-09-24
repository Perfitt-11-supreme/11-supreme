import { heart_filled, heart_empty } from '../../../assets/assets';
import {
  brandListBox,
  brandLists,
  brandNameBox,
  brandsContainer,
  heartFilledIcon,
  logoUrlNone,
  logoUrlNoneText,
  hiddenBrand, // display: none 처리를 위한 클래스 추가
} from './likedInBrand.css';
import { useState } from 'react';

type TBrand = {
  brandNameEn: string;
  brandNameKo: string;
  logoImage?: string;
  brandId?: string;
};

type LikedInBrandCardProps = {
  brand: TBrand | null;
  isHeartFilled?: boolean;
  onCardClick?: () => void; // 클릭 이벤트를 처리하는 함수
  onDelete?: (id: string) => void; // 삭제 함수
  logos: { name: string; url: string }[];
};

const LikedInBrand = ({ brand, isHeartFilled = false, logos, onDelete }: LikedInBrandCardProps) => {
  if (!brand) {
    return null;
  }
  const [isChecked, setIsChecked] = useState(isHeartFilled);
  console.log('heart :', isChecked);

  // 브랜드 이름과 로고를 매칭하는 함수
  const getLogoUrl = (brandNameEn: string) => {
    const logo = logos.find(logo => logo.name.toLowerCase() === brandNameEn.toLowerCase());
    return logo ? logo.url : ''; // 로고가 없을 경우 빈 문자열 반환
  };

  const handleHeartChecked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(prev => !prev);

    if (isChecked) {
      if (brand?.brandId) {
        onDelete?.(brand.brandId); // 삭제 함수 호출
      } else {
      }
    }
  };
  const logoUrl = getLogoUrl(brand.brandNameEn);

  return (
    <>
      <section className={brandsContainer}>
        <article
          className={`${brandLists} ${heart_filled ? '' : hiddenBrand}`} // 하트 상태에 따라 display 처리
        >
          <div className={brandListBox}>
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
          <div
            onClick={e => {
              e.stopPropagation();
              handleHeartChecked(e);
            }}
          >
            <img className={heartFilledIcon} src={isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
        </article>
      </section>
    </>
  );
};

export default LikedInBrand;
