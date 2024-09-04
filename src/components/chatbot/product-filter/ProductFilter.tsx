import { detail } from "../../../assets/assets.css";
import SizeRecommendationCard from "../../common/size-recommendation-card/SizeRecommendationCard";
import { ProductRecommendResult } from "../product-recommendation/ProductRecommendation.css";
import { productRecommend, productRecommendFilterContainer, productRecommendFilterDetail, productRecommendFilterWrap, productRecommendFiltering, productRecommendWrapper } from "./productFilter.css";
const dummy = [
  {
    id: 1,
    content: <SizeRecommendationCard />
  },
  {
    id: 2,
    content: <SizeRecommendationCard />
  },
  {
    id: 3,
    content: <SizeRecommendationCard />
  },
  {
    id: 4,
    content: <SizeRecommendationCard />
  },
  {
    id: 5,
    content: <SizeRecommendationCard />
  },
  {
    id: 6,
    content: <SizeRecommendationCard />
  },
  {
    id: 7,
    content: <SizeRecommendationCard />
  },
  {
    id: 8,
    content: <SizeRecommendationCard />
  },
  {
    id: 9,
    content: <SizeRecommendationCard />
  },

]

const ProductFilter = () => {
  return (
    <>
      <div className={productRecommendFilterWrap}>
        <p style={{ fontSize: '14px' }}>
          <span className={ProductRecommendResult}>512</span>
          개 상품</p>
        <div className={productRecommendFilterContainer}>
          <select className={productRecommendFiltering}>
            <option>최신상품순</option>
          </select>
          <img src={detail} className={productRecommendFilterDetail} />
        </div>
      </div>
      <div className={productRecommendWrapper}>
        <ul className={productRecommend}>
          {dummy.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ProductFilter