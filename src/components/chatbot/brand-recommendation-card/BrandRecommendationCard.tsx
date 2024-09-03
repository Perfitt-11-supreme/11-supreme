import { small_arrow } from "../../../assets/assets.css";
import { brandRecommendButton, brandRecommendCardWrap, brandRecommendImgContainer, brandRecommendText, brandRecommendTextWrap } from "./brandRecommendationCard.css";

const BrandRecommendationCard = () => {
  return (
    <>
      <div className={brandRecommendCardWrap}>
        <div className={brandRecommendImgContainer}>
          <img />
        </div>
        <div className={brandRecommendButton}>
          <div className={brandRecommendTextWrap}>
            <p className={brandRecommendText}>전체 상품 보기</p>
            <img src={small_arrow} />
          </div>
        </div>
      </div>
    </>
  );
}
export default BrandRecommendationCard