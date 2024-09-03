import { export_icon, thumbsDown } from "../../../assets/assets.css";
import ProductRecommendationCard from "../../common/product-recommendation-card/ProductRecommendationCard";
import { brandRecommendContainer, brandRecommendIcon, brandRecommendIconWrap, brandRecommendWrap } from "../brand-recommendation/brandRecommendation.css";
const dummy = [
  {
    id: 1,
    content: <ProductRecommendationCard />
  },
  {
    id: 2,
    content: <ProductRecommendationCard />
  },
  {
    id: 3,
    content: <ProductRecommendationCard />
  },
  {
    id: 4,
    content: <ProductRecommendationCard />
  },
  {
    id: 5,
    content: <ProductRecommendationCard />
  },
  {
    id: 6,
    content: <ProductRecommendationCard />
  }
]

const ProductRecommendationPreview = () => {
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
export default ProductRecommendationPreview