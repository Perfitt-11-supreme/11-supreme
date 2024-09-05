import { detail } from "../../../assets/assets";
import useModalStore from "../../../stores/useModalStore";
import Modal from "../../common/modal/Modal";
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
  const { setIsOpen } = useModalStore();

  const handleDetailClick = () => {
    setIsOpen(true);  // detail 버튼 클릭 시 Modal 열기
  };


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
          <img src={detail} className={productRecommendFilterDetail} onClick={handleDetailClick} />
        </div>
      </div>
      <div className={productRecommendWrapper}>
        <ul className={productRecommend}>
          {dummy.map((item) => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
      <Modal height="330px" title="필터"></Modal>
    </>
  );
}
export default ProductFilter