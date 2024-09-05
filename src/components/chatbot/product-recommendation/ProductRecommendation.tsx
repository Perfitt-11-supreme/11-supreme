import { close, prefitt_symbol } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import ProductFilter from "../product-filter/ProductFilter";
import { chatBotRecommendText, productRecommendTextContainer, productRecommendTextWrap, productRecommendWrap } from "./ProductRecommendation.css";

const ProductRecommendation = () => {
  const { setIsOpen } = useModalStore();

  const handleCloseClick = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={productRecommendWrap}>
        <div className={productRecommendTextWrap}>
          <div className={productRecommendTextContainer}>
            <img src={prefitt_symbol} alt="" />
            <div className={chatBotRecommendText}>
              <p>장마철 신기 좋은 운동화</p>
            </div>
          </div>
          <img src={close} alt="" style={{ cursor: 'pointer' }} onClick={handleCloseClick} />
        </div>
        <ProductFilter />
      </div>
    </>
  );
}
export default ProductRecommendation