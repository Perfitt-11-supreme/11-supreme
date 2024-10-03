import { heart_empty, heart_filled } from '../../../assets/assets';
import {
  brandListBox,
  brandLists,
  brandNameBox,
  brandsContainer,
  heartFilledIcon,
  logoUrlNone,
  logoUrlNoneText,
  hiddenBrand, // display: none 처리를 위한 클래스 추가
} from './liked-in-brand.css';
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
  logos?: any;
};

const LikedInBrand = ({ brand, isHeartFilled = false, logos, onDelete }: LikedInBrandCardProps) => {
  // brand가 null일 경우 아무것도 렌더링하지 않음
  if (!brand) {
    return <></>;
  }
  const [isChecked, setIsChecked] = useState(isHeartFilled);

  const handleHeartChecked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(prev => !prev);

    // 하트가 채워져 있을 때 (삭제 이벤트)
    if (isChecked && brand?.brandId) {
      console.log('Deleting brand with brandId:', brand?.brandId); // brandId 확인
      onDelete?.(brand.brandId); // 삭제 함수 호출
    }

    // if (isChecked) {
    //   if (brand?.brandId) {
    //     onDelete?.(brand.brandId); // 삭제 함수 호출
    //   } else {
    //   }
    // }
  };

  return (
    <>
      <section className={brandsContainer}>
        <article
          className={`${brandLists} ${heart_filled ? '' : hiddenBrand}`} // 하트 상태에 따라 display 처리
        >
          <div className={brandListBox}>
            {logos ? (
              <img src={logos} alt={`${brand.brandNameEn} logo`} width="75" height="75" />
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
            {/* 브랜드 페이지 시안 x */}
            <img className={heartFilledIcon} src={isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
        </article>
      </section>
    </>
  );
};

export default LikedInBrand;
