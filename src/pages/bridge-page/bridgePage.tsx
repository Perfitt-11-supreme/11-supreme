import { responsiveBox } from '../../styles/responsive.css';
import {
  bridgeBrandGuide,
  bridgeBrandGuideText,
  bridgeBrandGuideWrap,
  bridgeBrandImageContainer,
  bridgeProductContainer,
} from './bridgePage.css';

const BridgePage = () => {
  return (
    <>
      <div className={responsiveBox}>
        <div className={bridgeProductContainer}>
          <div className={bridgeBrandImageContainer}>
            <img />
          </div>
          <div className={bridgeBrandGuideWrap}>
            <p style={{ letterSpacing: '-0.24px' }}>[Crocs] 올 터레인 클로그 블랙</p>
            <div className={bridgeBrandGuide}>
              <h1>ABC MART로</h1>
              <h1>이동 중입니다.</h1>
            </div>
            <p className={bridgeBrandGuideText}>잠시만 기다려주세요.</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BridgePage;
