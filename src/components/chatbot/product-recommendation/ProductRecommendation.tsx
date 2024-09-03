import { detail, prefitt_symbol } from "../../../assets/assets.css";
import SizeRecommendationCard from "../../common/size-recommendation-card/SizeRecommendationCard";
import { ProductRecommendResult, chatBotRecommendText, productRecommend, productRecommendFilterContainer, productRecommendFilterDetail, productRecommendFilterWrap, productRecommendFiltering, productRecommendTextWrap, productRecommendWrap } from "./ProductRecommendation.css";

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
  }
]

const ProductRecommendation = () => {
  return (
    <>
      <div className={productRecommendWrap}>
        <div className={productRecommendTextWrap}>
          <img src={prefitt_symbol} alt="" />
          <div className={chatBotRecommendText}>
            <p>장마철 신기 좋은 운동화</p>
          </div>
        </div>
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
        <ul className={productRecommend}>
          {dummy.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default ProductRecommendation