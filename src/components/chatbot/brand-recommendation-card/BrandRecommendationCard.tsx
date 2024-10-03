import { small_arrow } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import { TBrand } from "../../../types/brand";
import { brandRecommendButton, brandRecommendCardWrap, brandRecommendImgContainer, brandRecommendText, brandRecommendTextWrap } from "./brandRecommendationCard.css";

const BrandRecommendationCard = ({ thumbnail, brand }: TBrand) => {
  const { setIsOpen } = useModalStore()

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  return (
    <>
      <div className={brandRecommendCardWrap}>
        <div className={brandRecommendImgContainer}>
          <img src={thumbnail} alt={brand} width="94px" height={0} />
        </div>
        <div className={brandRecommendButton}>
          <div className={brandRecommendTextWrap} onClick={handleOpenModal}>
            <p className={brandRecommendText}>전체 상품 보기</p>
            <img src={small_arrow} alt='icon' width="4px" height="12px" />
          </div>
        </div>
      </div>
    </>
  );
}
export default BrandRecommendationCard