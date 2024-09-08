import { back_arrow } from "../../../assets/assets";
import { theme } from "../../../styles/theme";
import Button from "../../common/button/Button";
import { bubbleContainer, bubbleContent, fitCommentAIContainer, fitCommentAIResult, fitCommentAItext, fitCommentAItextContainer, fitCommentDescription, fitCommentHeader, fitCommentProductContainer, fitCommentProductImage, fitCommentProductTextContainer, fitCommentSlider, fitCommentSliderContainer, fitCommentSliderDot, fitCommentSliderDotContainer, fitCommentSliderLabels, fitCommentSliderThumbs, fitCommentSliderWrap, fitCommentWrap } from "./productFitComment.css";

const ProductFitComment = () => {

  return (
    <>
      <div className={fitCommentWrap}>
        <div className={fitCommentHeader}>
          <img src={back_arrow} />
        </div>
        <div className={fitCommentProductContainer}>
          <div className={fitCommentProductImage}>
            <img />
          </div>
          <div className={fitCommentProductTextContainer}>
            <h1>Crocs</h1>
            <h1 style={{ fontWeight: 600 }}>올 터레인 클로그 블랙</h1>
          </div>
        </div>
        <section className={fitCommentAIContainer}>
          <div className={fitCommentAItextContainer}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <p>🤖</p>
              <p className={fitCommentAItext}>Perfitt AI</p>
            </div>
            <p className={fitCommentAIResult}>이 신발을 <span style={{ fontWeight: 800, fontSize: '18px' }}>'기본 핏'</span>으로 분석했어요.</p>
          </div>
          <div className={fitCommentSliderContainer}>
            <div className={bubbleContainer}>
              <div className={bubbleContent}>
              </div>
              <p style={{ color: theme.color.white }}>gd</p>
            </div>

            <div className={fitCommentSliderWrap}>
              <div className={fitCommentSlider}>
                <div className={fitCommentSliderThumbs}></div>
                <div className={fitCommentSliderDotContainer}>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                  <span className={fitCommentSliderDot}></span>
                </div>
              </div>
            </div>
            <div className={fitCommentSliderLabels}>
              <span>작은 신발</span>
              <span>보통</span>
              <span>큰 신발</span>
            </div>
          </div>
        </section>
        <section className={fitCommentDescription}>
          <p>Satin 소재를 사용하여 매끄럽고 은은한 광택이 느껴지도록 디자인 되었으며 기능적으로는 이중으로 디자인 된 솔 구조가 키 높이 효과와 함께 안정적인 쿠셔닝을 제공합니다. 맨발이 닿는 내측의 라이닝을 가죽 소재로 마감하여 부드럽게 발을 감싸는 착화감을 지니고 있습니다. 힐은 스트랩 구조로 제작되어 있어 사이즈 선택에는 매우 유연합니다. 다만 두꺼운 솔을 가졌기 때문에 조금은 묵직한 느낌이 있어 정 사이즈나 반 사이즈를 작게 신길 추천 드립니다.</p>
        </section>
        <Button text="내 발 측정하기" />
      </div>
    </>
  );
}
export default ProductFitComment