import { small_arrow } from "../../../assets/assets.css";
import useModalStore from "../../../stores/useModalStore";
import { brandRecommendButton, brandRecommendCardWrap, brandRecommendImgContainer, brandRecommendText, brandRecommendTextWrap } from "./brandRecommendationCard.css";

const BrandRecommendationCard = () => {
  const { setIsOpen } = useModalStore()

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  return (
    <>
      <div className={brandRecommendCardWrap}>
        <div className={brandRecommendImgContainer}>
          <img />
        </div>
        <div className={brandRecommendButton}>
          <div className={brandRecommendTextWrap} onClick={handleOpenModal}>
            <p className={brandRecommendText}>전체 상품 보기</p>
            <img src={small_arrow} />
          </div>
        </div>
      </div>
    </>
  );
}
export default BrandRecommendationCard