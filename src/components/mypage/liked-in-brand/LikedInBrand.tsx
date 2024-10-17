import { heart_empty, heart_filled } from '../../../assets/assets';
import {
  brandListBox,
  brandLists,
  brandNameBox,
  brandsContainer,
  heartFilledIcon,
  logoUrlNone,
  logoUrlNoneText,
} from './likedInBrand.css';
import { useState } from 'react';
import useMyLikedBrandStore from '../../../stores/useMyLikedBrandStore';
import useUserStore from '../../../stores/useUserStore';

type TBrand = {
  brandNameEn?: string;
  brandNameKo?: string;
  logoImage?: string;
  brandId?: string;
};

type LikedInBrandCardProps = {
  brand: TBrand | null;
  isHeartFilled?: boolean;
  logos?: any;
};

const LikedInBrand = ({ brand, isHeartFilled = true, logos }: LikedInBrandCardProps) => {
  const { user } = useUserStore();
  const { deleteBrand } = useMyLikedBrandStore();
  const [isChecked, setIsChecked] = useState(isHeartFilled);

  const handleHeartChecked = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked(prev => !prev);

    if (user?.uid && isChecked && brand?.brandId) {
      deleteBrand(user.uid, brand.brandId);
    }
  };

  // 브랜드 ID에 따른 브랜드명 설정
  let brandNameEn = brand?.brandNameEn;
  let brandNameKo = brand?.brandNameKo;

  switch (brand?.brandId) {
    case 'Crocs':
      brandNameEn = 'CROCS';
      brandNameKo = '크록스';
      break;
    case 'Adidas':
      brandNameEn = 'ADIDAS';
      brandNameKo = '아디다스';
      break;
    case 'Nike':
      brandNameEn = 'NIKE';
      brandNameKo = '나이키';
      break;
    default:
      break;
  }

  return (
    <section className={brandsContainer}>
      <article className={brandLists}>
        <div className={brandListBox}>
          {logos ? (
            <img src={logos} alt={`${brand?.brandNameEn} logo`} width="75" height="75" />
          ) : (
            <div className={logoUrlNone}>
              <span className={logoUrlNoneText}>No Image</span>
            </div>
          )}
          <div className={brandNameBox}>
            <strong>{brandNameEn}</strong>
            <p>{brandNameKo}</p>
          </div>
        </div>
        <div onClick={handleHeartChecked}>
          <img className={heartFilledIcon} src={isChecked ? heart_filled : heart_empty} alt="heart" />
        </div>
      </article>
    </section>
  );
};

export default LikedInBrand;
