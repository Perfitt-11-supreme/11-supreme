import { motion } from 'framer-motion';
import { arrow_right, export_icon, thumbs_down } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import useUserStore from '../../../stores/useUserStore';
import { TProduct } from '../../../types/product';
import { fetchShareId } from '../../../utils/sharedChatHistoryUtils';
import ProductRecommendationCard from '../../common/product-recommendation-card/ProductRecommendationCard';
import { brandRecommendIcon } from '../brand-recommendation/brandRecommendation.css';
import {
  productRecommendPreviewContainer,
  productRecommendPreviewIcon,
  productRecommendPreviewIconWrap,
  productRecommendPreviewMore,
  productRecommendPreviewMoreIcon,
  productRecommendPreviewWrap,
} from './productRecommendationPreview.css';
import useMyViewedProductStore from '../../../stores/useMyViewedProductStore';
import useMyLikedProductStore from '../../../stores/useMyLikedProductStore';
import { useEffect } from 'react';
interface ProductRecommendationPreviewProps {
  products: TProduct[];
  shareId?: string;
  onMoreClick?: () => void | null;
}

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

const ProductRecommendationPreview = ({ products = [], shareId, onMoreClick }: ProductRecommendationPreviewProps) => {
  const { setIsOpen, setIsShareModalOpen, setShareModalId } = useModalStore();
  const { user } = useUserStore();
  const previewProducts = products.slice(0, 2);
  // myLiked 관련 함수 zustand 스토어에서 함수 가져오기 - 하윤
  const { fetchProductsLikedData, productsData, handleProductHeartChecked } = useMyLikedProductStore();
  const { handleCardClick } = useMyViewedProductStore();

  // 좋아요 하트 true값 유지하기 - 하윤
  useEffect(() => {
    if (user?.uid) {
      fetchProductsLikedData(user.uid); // Firestore에서 liked 데이터 불러오기
    }
  }, [user?.uid, fetchProductsLikedData]);

  const handleOpenModal = () => {
    if (onMoreClick) {
      onMoreClick();
    }
    setIsOpen(true);
  };

  const handleOpenShareModal = async () => {
    if (shareId) {
      if (user?.uid) {
        // user.uid가 null이 아닐 경우만 실행
        const fetchedShareId = await fetchShareId(user.uid, shareId);

        if (fetchedShareId) {
          setShareModalId(fetchedShareId);
          setIsShareModalOpen(true);
        } else {
          console.log('공유 ID를 찾을 수 없습니다.');
        }
      } else {
        console.log('사용자 ID가 제공되지 않았습니다.'); // 사용자 ID가 없을 때 처리
      }
    } else {
      console.log('공유 ID가 제공되지 않았습니다.');
    }
  };

  return (
    <>
      <div className={productRecommendPreviewWrap}>
        <motion.ul className={productRecommendPreviewContainer} drag="x" dragConstraints={{ left: -60, right: 0 }}>
          {previewProducts.length > 0 ? (
            // previewProducts.map(product => (
            previewProducts.map(product => {
              // Firestore에서 liked 상태를 가져옴 - 하윤
              const isLiked = getIsLikedStatus(product?.productId, product?.modelNo, productsData);
              return (
                <li key={product?.productId}>
                  <ProductRecommendationCard
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
            })
          ) : (
            <li>상품이 없습니다.</li> // 상품이 없을 때 보여줄 메시지
          )}
          <li onClick={handleOpenModal}>
            <div className={productRecommendPreviewMore}>
              <img src={arrow_right} className={productRecommendPreviewMoreIcon} alt="more_button" />
              <p style={{ fontSize: '9px', marginTop: '6px' }}>더보기</p>
            </div>
          </li>
        </motion.ul>
        <div className={productRecommendPreviewIconWrap}>
          <img
            src={export_icon}
            alt=""
            className={productRecommendPreviewIcon}
            onClick={handleOpenShareModal}
            width="22px"
            height="22px"
          />
          <img src={thumbs_down} alt="" className={brandRecommendIcon} width="22px" height="22px" />
        </div>
      </div>
    </>
  );
};
export default ProductRecommendationPreview;
