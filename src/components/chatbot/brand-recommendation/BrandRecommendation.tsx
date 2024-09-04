import { export_icon, thumbs_down } from "../../../assets/assets";
import useBrandStore from "../../../stores/useBrandStore";
import BrandRecommendationCard from "../brand-recommendation-card/BrandRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "./brandRecommendation.css";

interface DummyItem {
  id: number;
  content: JSX.Element;
  value: string;
}

const dummy: DummyItem[] = [
  { id: 1, content: <BrandRecommendationCard />, value: 'rockfish weather wear' },
  { id: 2, content: <BrandRecommendationCard />, value: 'crocs' },
  { id: 3, content: <BrandRecommendationCard />, value: 'bensimon' },
  { id: 4, content: <BrandRecommendationCard />, value: 'adidas' },
  { id: 5, content: <BrandRecommendationCard />, value: 'nike' },
  { id: 6, content: <BrandRecommendationCard />, value: 'new balance' }
];



const BrandRecommendation = () => {
  const setSelectedBrand = useBrandStore((state) => state.setSelectedBrand);

  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
  }
  return (
    <>
      <div className={brandRecommendWrap}>

        <ul className={brandRecommendContainer}>
          {dummy.map((item) => (
            <li key={item.id} onClick={() => handleBrandClick(item.value)}>{item.content}</li>
          ))}
        </ul>
        <div className={brandRecommendIconWrap}>
          <img src={export_icon} alt="" className={brandRecommendIcon} />
          <img src={thumbs_down} alt="" className={brandRecommendIcon} />
        </div>

      </div>
    </>
  );
}
export default BrandRecommendation