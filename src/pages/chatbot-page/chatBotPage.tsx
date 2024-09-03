import { hamburger_menu } from "../../assets/assets.css";
import BrandRecommendation from "../../components/chatbot/brand-recommendation/BrandRecommendation";
import ChatBotBubble from "../../components/chatbot/chatbot-bubble/ChatBotBubble";
import FootSizeCard from "../../components/chatbot/foot-size-card/FootSizeCard";
import ProductRecommendationPreview from "../../components/chatbot/product-recommendation-preview/ProductRecommendationPreview";
import ProductRecommendation from "../../components/chatbot/product-recommendation/ProductRecommendation";
import UserBubble from "../../components/chatbot/user-bubble/UserBubble";

import ChatbotSearchInput from "../../components/common/chatbot-search-input/ChatbotSearchInput";
import Header from "../../components/common/header/Header";
import Modal from "../../components/common/modal/Modal";
import { chatBotCardWrap, chatBotContainer, chatBotModalWrap, chatBotWrap, chatBubbleWrap } from "./chatBotPage.css";

const ChatBotPage = () => {
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
            <ChatbotSearchInput />
            <Modal height="758px">
              <ProductRecommendation />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotPage