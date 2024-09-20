import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { brandInfoAPI } from "../../../api/chatRequests";
import { close } from "../../../assets/assets";
import LoadingPage from "../../../pages/loading-page/loadingPage";
import useBrandStore from "../../../stores/useBrandStore";
import useModalStore from "../../../stores/useModalStore";
import useProductStore from "../../../stores/useProductsStore";
import FilterButton from "../../common/filter-button/FilterButton";
import ProductFilter from "../product-filter/ProductFilter";
import { brandPlpBrandImage, brandPlpFilterButtonWrap, brandPlpNameContainer, brandPlpWrap } from "./brandPLP.css";


const filterCategories = ['ALL', 'WOMEN', 'MEN', 'KIDS'];
const BrandPLP = () => {
  const { setIsOpen } = useModalStore();
  const { selectedBrand } = useBrandStore()
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { setProducts } = useProductStore()

  const handleFilterButtonClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
  };

  /**브랜드 정보 불러오는 함수 */
  const { data: brandInfoData, isLoading: brandInfoIsLoading, error: brandInfoError } = useQuery({
    queryKey: ['brandInfo', selectedBrand],
    queryFn: async () => {
      if (selectedBrand) { // selectedBrand가 존재할 때만 호출
        const response = await brandInfoAPI(selectedBrand); // selectedBrand를 API에 전달
        console.log("브랜드 정보 데이터 확인", response)
        setProducts(response.data.products)
        return response.data; // 데이터를 반환
      }
      return null; // selectedBrand가 없으면 null 반환
    },
    enabled: !!selectedBrand, // selectedBrand가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

  })

  const filteredProducts = (brandInfoData && brandInfoData.products) ?
    (activeFilter === 'ALL'
      ? brandInfoData.products
      : brandInfoData.products.filter((product: { gender: string; }) => {
        if (activeFilter === 'MEN') return product.gender === 'MM';
        if (activeFilter === 'WOMEN') return product.gender === 'WW'; // 여성의 경우 WW로 가정
        if (activeFilter === 'KIDS') return product.gender === 'KK';
        return true;
      }))
    : [];



  if (brandInfoIsLoading) return <LoadingPage />;
  if (brandInfoError) return <div>에러 발생: {(brandInfoError as Error).message}</div>;
  if (!brandInfoData || !brandInfoData.products) return <div>데이터가 없습니다.</div>;

  return (
    <>
      <div className={brandPlpWrap}>
        <div className={brandPlpNameContainer}>
          <h1 style={{ fontWeight: 600 }}>{selectedBrand}</h1>
          <img src={close} alt="" style={{ cursor: 'pointer' }} onClick={handleCloseClick} />
        </div>
        <section className={brandPlpBrandImage}>
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
