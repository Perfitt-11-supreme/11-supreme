import { prefitt_logo2 } from '../../assets/assets';
import useProductDetailStore from '../../stores/useProductDetailStore';
import { responsiveBox } from '../../styles/responsive.css';
import {
  bridgeBrandGuide,
  bridgeBrandGuideText,
  bridgeBrandGuideWrap,
  bridgeBrandImageContainer,
  bridgeProductContainer,
} from './bridgePage.css';

const BridgePage = () => {
  const { selectedProduct } = useProductDetailStore()
  return (

    <div className={responsiveBox}>
      <div className={bridgeProductContainer}>
        <div className={bridgeBrandImageContainer}>
          <img src={prefitt_logo2} />
        </div>
        <div className={bridgeBrandGuideWrap}>
          {selectedProduct &&
            <p style={{ letterSpacing: '-0.24px' }}>[{selectedProduct.brand}] {selectedProduct.modelName}</p>
          }
          <div className={bridgeBrandGuide}>
            <h1>ABC MART로</h1>
            <h1>이동 중입니다.</h1>
          </div>
          <p className={bridgeBrandGuideText}>잠시만 기다려주세요.</p>
        </div>
      </div>
    </div>

  );
};
export default BridgePage;
