import { export_icon, thumbs_down } from "../../../assets/assets";
import useBrandStore from "../../../stores/useBrandStore";
import { TBrand } from "../../../types/brand";
import BrandRecommendationCard from "../brand-recommendation-card/BrandRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "./brandRecommendation.css";



const BrandRecommendation = ({ brands }: { brands: TBrand[] | null }) => {
  if (!brands || brands.length === 0) {
    return null; // brands가 없을 때는 아무것도 렌더링하지 않음
  }
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
  }
  return (

    <div className={brandRecommendWrap}>
      <ul className={brandRecommendContainer}>
        {brands.map((item, index) => (
          <li key={index} onClick={() => handleBrandClick(item.brand)}><BrandRecommendationCard {...item} /></li>
        ))}
      </ul>
      <div className={brandRecommendIconWrap}>
        <img src={export_icon} alt="" className={brandRecommendIcon} />
        <img src={thumbs_down} alt="" className={brandRecommendIcon} />
      </div>

    </div>
  );
}
export default BrandRecommendation