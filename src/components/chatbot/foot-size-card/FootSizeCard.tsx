import { speech_bubble } from "../../../assets/assets";
import { footSizeBubbleIcon, footSizeButton, footSizeButtonContainer, footSizeCardBottom, footSizeCardContainer, footSizeCardTop, footSizeHeadingText, footSizeSubText, footSizeText } from "./footSizeCard.css";

const FootSizeCard = () => {
  return (
    <>
      <div className={footSizeCardContainer}>
        <div className={footSizeCardTop}>
          <span>
            <h1 className={footSizeHeadingText}>내 발 측정하기</h1>
            <p className={footSizeSubText}>AI 발 사이즈 추천</p>
          </span>
          <div className={footSizeBubbleIcon}>
            <img src={speech_bubble} alt="" />
          </div>
        </div>
        <div className={footSizeCardBottom}>
          <div className={footSizeText}>
            <p>발 사이즈를 측정하면 AI가 분석해드려요.</p>
            <p>원하는 신발의 사이즈를 추천받아보세요.</p>
          </div>
          <div className={footSizeButtonContainer}>
            <button type="button" className={footSizeButton}>내 발 사이즈 알아보기</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default FootSizeCard