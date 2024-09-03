import { export_icon, thumbsDown } from "../../../assets/assets.css";
import BrandRecommendationCard from "../brand-recommendation-card/BrandRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "./brandRecommendation.css";

const dummy = [
  {
    id: 1,
    content: <BrandRecommendationCard />
  },
  {
    id: 2,
    content: <BrandRecommendationCard />
  },
  {
    id: 3,
    content: <BrandRecommendationCard />
  },
  {
    id: 4,
    content: <BrandRecommendationCard />
  },
  {
    id: 5,
    content: <BrandRecommendationCard />
  },
  {
    id: 6,
    content: <BrandRecommendationCard />
  }
]


const BrandRecommendation = () => {
  return (
    <>
      <div className={brandRecommendWrap}>

        <ul className={brandRecommendContainer}>
          {dummy.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
        <div className={brandRecommendIconWrap}>
          <img src={export_icon} alt="" className={brandRecommendIcon} />
          <img src={thumbsDown} alt="" className={brandRecommendIcon} />
        </div>

      </div>
    </>
  );
}
export default BrandRecommendation