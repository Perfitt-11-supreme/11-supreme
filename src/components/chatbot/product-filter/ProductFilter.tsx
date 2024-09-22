import { detail } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import useProductStore from '../../../stores/useProductsStore';
import { TProduct } from '../../../types/product';
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

type ProductFilterProps = {
  filterProducts?: TProduct[]
}

const ProductFilter = ({ filterProducts }: ProductFilterProps) => {
  const { setFilterOpen, filterOpen } = useModalStore();
  const { products = [] } = useProductStore()

  const handleDetailClick = () => {
    setFilterOpen(true);
    console.log("필터")
  };

  const displayProducts = filterProducts || products;

  console.log("상태전달", displayProducts)

  return (
    <>
      <div className={productRecommendFilterWrap}>
        <p style={{ fontSize: '14px' }}>
          <span className={ProductRecommendResult}>{displayProducts.length}</span>개 상품
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
          {displayProducts.map((product, index) => (
            <li key={index}><SizeRecommendationCard product={product} /></li>
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