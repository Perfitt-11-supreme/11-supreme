import { prefitt_symbol } from "../../../assets/assets.css";
import ProductFilter from "../product-filter/ProductFilter";
import { chatBotRecommendText, productRecommendTextWrap, productRecommendWrap } from "./ProductRecommendation.css";

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
        <ProductFilter />
      </div>
    </>
  );
}
export default ProductRecommendation