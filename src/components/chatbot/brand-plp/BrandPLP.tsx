import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { brandInfoAPI } from '../../../api/chatRequests';
import { close, heart_empty, heart_filled } from '../../../assets/assets';
import LoadingPage from '../../../pages/loading-page/loadingPage';
import useBrandStore from '../../../stores/useBrandStore';
import useModalStore from '../../../stores/useModalStore';
import useProductStore from '../../../stores/useProductsStore';
import FilterButton from '../../common/filter-button/FilterButton';
import ProductFilter from '../product-filter/ProductFilter';
import {
  brandPlpBrandImage,
  brandPlpFilterButtonWrap,
  brandPlpNameContainer,
  brandPlpWrap,
  heartIconBox,
} from './brandPLP.css';
import useUserStore from '../../../stores/useUserStore';
import useMyLikedBrandStore from '../../../stores/useMyLikedBrandStore';

type THeart = {
  isHeartFilled?: boolean;
};

const filterCategories = ['ALL', 'WOMEN', 'MEN', 'KIDS'];
const BrandPLP = ({ isHeartFilled }: THeart) => {
  const { setIsOpen } = useModalStore();
  const { selectedBrand } = useBrandStore();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { setProducts } = useProductStore();
  // 브랜드 좋아요 이벤트 - 하윤
  const { user } = useUserStore();
  const { addBrand, deleteBrand, brandsData, fetchBrandsData } = useMyLikedBrandStore();
  const [isChecked, setIsChecked] = useState(isHeartFilled);

  // user가 있고 selectedBrand가 있을 때 Firestore에서 데이터 가져오기 - 하윤
  useEffect(() => {
    if (user?.uid && selectedBrand) {
      fetchBrandsData(user.uid);
    }
  }, [user?.uid, selectedBrand, fetchBrandsData]);

  // Firestore에서 데이터를 가져와 isChecked를 설정 - 하윤
  useEffect(() => {
    if (selectedBrand && brandsData[selectedBrand]?.isLiked) {
      setIsChecked(brandsData[selectedBrand].isLiked);
    }
  }, [brandsData, selectedBrand]);

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  /**브랜드 정보 불러오는 함수 */
  const {
    data: brandInfoData,
    isLoading: brandInfoIsLoading,
    error: brandInfoError,
  } = useQuery({
    queryKey: ['brandInfo', selectedBrand],
    queryFn: async () => {
      if (selectedBrand) {
        // selectedBrand가 존재할 때만 호출
        const response = await brandInfoAPI(selectedBrand); // selectedBrand를 API에 전달
        console.log('브랜드 정보 데이터 확인', response);
        setProducts(response.data.products);
        return response.data; // 데이터를 반환
      }
      return null; // selectedBrand가 없으면 null 반환
    },
    enabled: !!selectedBrand, // selectedBrand가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const filteredProducts =
    brandInfoData && brandInfoData.products
      ? activeFilter === 'ALL'
        ? brandInfoData.products
        : brandInfoData.products.filter((product: { gender: string }) => {
            if (activeFilter === 'MEN') return product.gender === 'MM';
            if (activeFilter === 'WOMEN') return product.gender === 'WW'; // 여성의 경우 WW로 가정
            if (activeFilter === 'KIDS') return product.gender === 'KK';
            return true;
          })
      : [];

  if (brandInfoIsLoading) return <LoadingPage />;
  if (brandInfoError) return <div>에러 발생: {(brandInfoError as Error).message}</div>;
  if (!brandInfoData || !brandInfoData.products) return <div>데이터가 없습니다.</div>;

  // 브랜드 좋아요 이벤트 - 하윤
  const handleHeartChecked = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (user?.uid && selectedBrand) {
      if (newChecked) {
        // Firestore에 브랜드 추가
        addBrand(user.uid, selectedBrand, {
          brandNameEn: selectedBrand,
          brandNameKo: selectedBrand,
          brandId: selectedBrand,
          logoImage: brandInfoData.brandHeaderImage,
        });
      } else {
        // Firestore에서 브랜드 삭제
        deleteBrand(user.uid, selectedBrand);
      }
    }
  };

  return (
    <>
      <div className={brandPlpWrap}>
        <div className={brandPlpNameContainer}>
          <h1 style={{ fontWeight: 600 }}>{selectedBrand}</h1>
          <img src={close} alt="" style={{ cursor: 'pointer' }} onClick={handleCloseClick} />
        </div>
        <section className={brandPlpBrandImage}>
          <div className={heartIconBox} onClick={handleHeartChecked}>
            <img src={isChecked ? heart_filled : heart_empty} alt="heart" />
          </div>
          <img src={brandInfoData.brandHeaderImage} />
        </section>
        <div className={brandPlpFilterButtonWrap}>
          {filterCategories.map(category => (
            <FilterButton
              key={category}
              title={category}
              isActive={activeFilter === category}
              onClick={() => handleFilterButtonClick(category)}
            />
          ))}
        </div>
        <ProductFilter filterProducts={filteredProducts} />
      </div>
    </>
  );
};
export default BrandPLP;
