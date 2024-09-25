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
interface ProductRecommendationPreviewProps {
  products: TProduct[];
  shareId?: string;
  onMoreClick?: () => void | null;
}

const ProductRecommendationPreview = ({ products = [], shareId, onMoreClick }: ProductRecommendationPreviewProps) => {
  const { setIsOpen, setIsShareModalOpen, setShareModalId } = useModalStore();
  const { user } = useUserStore()
  const previewProducts = products.slice(0, 2);

  const handleOpenModal = () => {
    if (onMoreClick) {
      onMoreClick();
    }
    setIsOpen(true);
  };


  const handleOpenShareModal = async () => {
    if (shareId) {
      if (user?.uid) { // user.uid가 null이 아닐 경우만 실행
        const fetchedShareId = await fetchShareId(user.uid, shareId);

        if (fetchedShareId) {
          setShareModalId(fetchedShareId);
          setIsShareModalOpen(true);
        } else {
          console.log("공유 ID를 찾을 수 없습니다.");
        }
      } else {
        console.log("사용자 ID가 제공되지 않았습니다."); // 사용자 ID가 없을 때 처리
      }
    } else {
      console.log("공유 ID가 제공되지 않았습니다.");
    }
  };

  return (
    <>
      <div className={productRecommendPreviewWrap}>
        <motion.ul className={productRecommendPreviewContainer} drag="x" dragConstraints={{ left: -60, right: 0 }}>
          {previewProducts.length > 0 ? (
            previewProducts.map(product => (
              <li key={product?.productId}>
                <ProductRecommendationCard product={product} />
              </li>
            ))
          ) : (
            <li>상품이 없습니다.</li> // 상품이 없을 때 보여줄 메시지
          )}
          <div onClick={handleOpenModal}>
            <div className={productRecommendPreviewMore}>
              <img src={arrow_right} className={productRecommendPreviewMoreIcon} />
              <p style={{ fontSize: '9px', marginTop: '6px' }}>더보기</p>
            </div>
          </div>
        </motion.ul>
        <div className={productRecommendPreviewIconWrap}>
          <img src={export_icon} alt="" className={productRecommendPreviewIcon} onClick={handleOpenShareModal} />
          <img src={thumbs_down} alt="" className={brandRecommendIcon} />
        </div>
      </div>
    </>
  );
};
export default ProductRecommendationPreview;
