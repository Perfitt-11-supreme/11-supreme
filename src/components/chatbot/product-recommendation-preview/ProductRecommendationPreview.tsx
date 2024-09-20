import { motion } from 'framer-motion';
import { arrow_right, export_icon, thumbs_down } from '../../../assets/assets';
import useModalStore from '../../../stores/useModalStore';
import { TProduct } from '../../../types/product';
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
  id?: string;
  onMoreClick?: () => void | null;
}

const ProductRecommendationPreview = ({ products = [], id, onMoreClick }: ProductRecommendationPreviewProps) => {
  const { setIsOpen, setIsShareModalOpen, setShareModalId } = useModalStore();

  const previewProducts = products.slice(0, 2);

  const handleOpenModal = () => {
    if (onMoreClick) {
      onMoreClick();
    }
    setIsOpen(true);
  };

  const handleOpenShareModal = () => {
    if (id) {
      setShareModalId(id);
      setIsShareModalOpen(true);
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
