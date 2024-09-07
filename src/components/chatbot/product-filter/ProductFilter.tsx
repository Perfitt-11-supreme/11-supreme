import { detail } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import SizeRecommendationCard from '../../mypage/size-recommendation-card/SizeRecommendationCard';
import ProductFilterDetail from '../product-filter-detail/ProductFilterDetail';
import ProductFilterModal from '../product-filter-modal/ProductFilterModal';
import { ProductRecommendResult } from '../product-recommendation/ProductRecommendation.css';
import {
  productRecommend,
  productRecommendFilterContainer,
  productRecommendFilterDetail,
  productRecommendFilterWrap,
  productRecommendFiltering,
  productRecommendWrapper,
} from './productFilter.css';
const dummy = [
  {
    id: 1,
    content: <SizeRecommendationCard />,
  },
  {
    id: 2,
    content: <SizeRecommendationCard />,
  },
  {
    id: 3,
    content: <SizeRecommendationCard />,
  },
  {
    id: 4,
    content: <SizeRecommendationCard />,
  },
  {
    id: 5,
    content: <SizeRecommendationCard />,
  },
  {
    id: 6,
    content: <SizeRecommendationCard />,
  },
  {
    id: 7,
    content: <SizeRecommendationCard />,
  },
  {
    id: 8,
    content: <SizeRecommendationCard />,
  },
  {
    id: 9,
    content: <SizeRecommendationCard />,
  },
];

const ProductFilter = () => {
  const { setFilterOpen, filterOpen } = useModalStore();

  const handleDetailClick = () => {
    setFilterOpen(true); // detail 버튼 클릭 시 Modal 열기
  };

  return (
    <>
      <div className={productRecommendFilterWrap}>
        <p style={{ fontSize: '14px' }}>
          <span className={ProductRecommendResult}>512</span>개 상품
        </p>
        <div className={productRecommendFilterContainer}>
          <select className={productRecommendFiltering}>
            <option>최신상품순</option>
          </select>
          <img src={detail} className={productRecommendFilterDetail} onClick={handleDetailClick} />
        </div>
      </div>
      <div className={productRecommendWrapper}>
        <ul className={productRecommend}>
          {dummy.map(item => (
            <li key={item.id}>{item.content}</li>
          ))}
        </ul>
      </div>
      {filterOpen && (
        <ProductFilterModal height="330px" title="필터">
          <ProductFilterDetail />
        </ProductFilterModal>
      )}
    </>
  );
};
export default ProductFilter;
