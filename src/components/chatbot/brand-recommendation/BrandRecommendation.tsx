import { export_icon, thumbs_down } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import { TBrand } from "../../../types/brand";
import BrandRecommendationCard from "../brand-recommendation-card/BrandRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "./brandRecommendation.css";

type BrandRecommendationProps = {
  brands: TBrand[] | null;
  id: string; // id를 추가
  onBrandClick: (brand: string) => void;
}

const BrandRecommendation = ({ brands, id, onBrandClick }: BrandRecommendationProps) => {
  if (!brands || brands.length === 0) {
    return null; // brands가 없을 때는 아무것도 렌더링하지 않음
  }
  // const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);
  const { setIsShareModalOpen, setShareModalId } = useModalStore()

  const handleBrandClick = (brand: string) => {
    onBrandClick(brand);
  }

  const handleOpenShareModal = () => {
    setShareModalId(id);
    setIsShareModalOpen(true)
  }
  return (

    <div className={brandRecommendWrap}>
      <ul className={brandRecommendContainer}>
        {brands.map((item, index) => (
          <li key={index} onClick={() => handleBrandClick(item.brand)}><BrandRecommendationCard {...item} /></li>
        ))}
      </ul>
      <div className={brandRecommendIconWrap}>
        <img src={export_icon} alt="" className={brandRecommendIcon} onClick={handleOpenShareModal} />
        <img src={thumbs_down} alt="" className={brandRecommendIcon} />
      </div>

    </div>
  );
}
export default BrandRecommendation