import { hamburger_menu } from "../../assets/assets";
import BrandPLP from "../../components/chatbot/brand-plp/BrandPLP";
import BrandRecommendation from "../../components/chatbot/brand-recommendation/BrandRecommendation";
import ChatBotBubble from "../../components/chatbot/chatbot-bubble/ChatBotBubble";
import FootSizeCard from "../../components/chatbot/foot-size-card/FootSizeCard";
import ProductRecommendationPreview from "../../components/chatbot/product-recommendation-preview/ProductRecommendationPreview";
import ProductRecommendation from "../../components/chatbot/product-recommendation/ProductRecommendation";
import UserBubble from "../../components/chatbot/user-bubble/UserBubble";
import ChatbotSearchInput from "../../components/common/chatbot-search-input/ChatbotSearchInput";

import Header from "../../components/common/header/Header";
import Modal from "../../components/common/modal/Modal";
import useBrandStore from "../../stores/useBrandStore";
import useModalStore from "../../stores/useModalStore";
import { chatBotCardWrap, chatBotContainer, chatBotModalWrap, chatBotWrap, chatBubbleWrap } from "./chatBotPage.css";

// const dummy = ['스니커즈', '트레킹', '운동', '산책', '여행', '운동화', '구두', '등산화', '샌들', '레인부츠', '슬리퍼']

const ChatBotPage = () => {
  const { selectedBrand } = useBrandStore()
  const { isOpen } = useModalStore(); // 모달 열림 상태 추가
  return (
    <>
      <div className={chatBotWrap}>
        <div className={chatBotContainer}>
          <Header imageSrc={hamburger_menu} alt="" />
          <div className={chatBubbleWrap}>
            <ChatBotBubble bubbleContent='반갑습니다 oo님 oo님을 위한 맞춤 상품을 추천해드릴게요' />
            <div className={chatBotCardWrap}>
              <FootSizeCard />
              <BrandRecommendation />
              <ProductRecommendationPreview />
            </div>
            <UserBubble bubbleContent='트레킹, 영화, 등산화' />
          </div>
          <div className={chatBotModalWrap}>

            {!isOpen && <ChatbotSearchInput />} {/* 모달이 열렸을 때는 ChatbotSearchInput을 숨김 */}
            <Modal
              height="758px"
            >
              {selectedBrand ? <BrandPLP /> : <ProductRecommendation />}
            </Modal>

            {/* 관심키워드 */}
            {/* <Modal height="340px" title="관심 키워드">
              <div className={keywordWrap}>
                {dummy.map((item, index) => (
                  <KeywordCard key={index} text={item} />
                ))}
                <div style={{ marginTop: '40px' }}>
                  <Button text="n개 선택" onClick={() => setShowInterestKeywords(false)} />
                </div>
              </div>
            </Modal> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotPage