import { motion } from 'framer-motion';
import { arrow_right, export_icon, thumbs_down } from "../../../assets/assets";
import useModalStore from '../../../stores/useModalStore';
import useProductStore from '../../../stores/useProductsStore';
import ProductRecommendationCard from '../../common/product-recommendation-card/ProductRecommendationCard';
import { brandRecommendIcon } from "../brand-recommendation/brandRecommendation.css";
import { productRecommendPreviewContainer, productRecommendPreviewIcon, productRecommendPreviewIconWrap, productRecommendPreviewMore, productRecommendPreviewMoreIcon, productRecommendPreviewWrap } from "./productRecommendationPreview.css";


const ProductRecommendationPreview = () => {
  const { setIsOpen } = useModalStore()
  const { products } = useProductStore()

  const previewProducts = products.slice(0, 2);

  const handleOpenModal = () => {
    setIsOpen(true)
  }
  return (
    <>
      <div className={productRecommendPreviewWrap}>


        <motion.ul className={productRecommendPreviewContainer}
          drag="x"
          dragConstraints={{ left: -60, right: 0 }}>
          {previewProducts.map((product) => (
            <li key={product.productId}>
              <ProductRecommendationCard product={product} />
            </li>
          ))}
          <div onClick={handleOpenModal}>
            <div className={productRecommendPreviewMore}>
              <img src={arrow_right} className={productRecommendPreviewMoreIcon} />
              <p style={{ fontSize: '9px', marginTop: '6px' }}>더보기</p>
            </div>
          </div>
        </motion.ul>
        <div className={productRecommendPreviewIconWrap}>
          <img src={export_icon} alt="" className={productRecommendPreviewIcon} />
          <img src={thumbs_down} alt="" className={brandRecommendIcon} />
        </div>

      </div>
    </>
  );
}
export default ProductRecommendationPreview