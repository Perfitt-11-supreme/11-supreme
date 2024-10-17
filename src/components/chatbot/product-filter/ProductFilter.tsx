import { useEffect } from 'react';
import { detail } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';
import useProductStore from '../../../stores/useProductsStore';
import useUserStore from '../../../stores/useUserStore';
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
import useMyViewedProductStore from '../../../stores/useMyViewedProductStore';

type ProductFilterProps = {
  filterProducts?: TProduct[];
};

// Firestore의 liked 상태를 계산하는 함수 - 하윤
const getIsLikedStatus = (
  productId: string | undefined,
  modelNo: string | undefined,
  productsData: { [key: string]: TProduct }
) => {
  // productId나 modelNo 둘 다 undefined이면 false 반환
  const id = productId || modelNo;
  if (!id) return false; // id가 없으면 바로 false 반환

  const product = productsData[id];
  return product?.isLiked || false;
};

const ProductFilter = ({ filterProducts }: ProductFilterProps) => {
  const { setFilterOpen, filterOpen } = useModalStore();
  const { products = [] } = useProductStore();
  // user 정보 가져오기 - 하윤
  const { user } = useUserStore();
  // myLiked 관련 함수 zustand 스토어에서 함수 가져오기 - 하윤
  const { fetchProductsLikedData, productsData, handleProductHeartChecked } = useMyLikedProductStore();
  const { handleCardClick } = useMyViewedProductStore();

  // 좋아요 하트 true값 유지하기 - 하윤
  useEffect(() => {
    if (user?.uid) {
      fetchProductsLikedData(user.uid); // Firestore에서 liked 데이터 불러오기
    }
  }, [user?.uid, fetchProductsLikedData]);

  const handleDetailClick = () => {
    setFilterOpen(true);
    console.log('필터');
  };

  const displayProducts = filterProducts || products;

  // console.log('상태전달', displayProducts);

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
          {displayProducts.map((product, index) => {
            // Firestore에서 liked 상태를 가져옴 - 하윤
            const isLiked = getIsLikedStatus(product?.productId, product?.modelNo, productsData);
            return (
              <li key={index} style={{ width: 'auto', minWidth: '166px' }}>
                <SizeRecommendationCard
                  product={product}
                  // 아래는 좋아요페이지에 추가하는 로직 - 하윤
                  isHeartFilled={isLiked} // Firestore에서 불러온 liked 상태 적용
                  userId={user?.uid || ''} // 사용자 ID 전달
                  productId={product?.productId || product?.modelNo || ''} // productId가 없으면 modelNo를 사용
                  moveHeartProduct={(productId, checked) =>
                    handleProductHeartChecked(user?.uid || '', productId, checked)
                  } // 하트 상태 변경 함수 전달
                  onCardClick={() =>
                    handleCardClick(user?.uid || '', product?.productId || product?.modelNo || '', product)
                  }
                />
              </li>
            );
          })}
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
