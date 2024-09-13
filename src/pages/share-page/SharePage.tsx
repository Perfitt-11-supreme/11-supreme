import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { arrow_right, chatCircle } from "../../assets/assets";
import ChatBotBubble from "../../components/chatbot/chatbot-bubble/ChatBotBubble";
import { productRecommendPreviewContainer, productRecommendPreviewMore, productRecommendPreviewMoreIcon, productRecommendPreviewWrap } from "../../components/chatbot/product-recommendation-preview/productRecommendationPreview.css";
import UserBubble from "../../components/chatbot/user-bubble/UserBubble";
import Button from "../../components/common/button/Button";
import ProductRecommendationCard from "../../components/common/product-recommendation-card/ProductRecommendationCard";
import { chatBotCardWrap } from "../chatbot-page/chatBotPage.css";
import { sharePageBubbleContainer, sharePageButtonContainer, sharePageContainer, sharePageDate, sharePageTextContainer, sharePageTitle, sharePageWrap } from "./sharePage.css";


const dummy = [
  {
    productId: '1',
    brand: 'NIKE',
    modelName: '어쩌고'
  },
  {
    id: '2',
    brand: 'NIKE',
    modelName: '어쩌고'
  },
]

const SharePage = () => {
  const navigate = useNavigate();
  const handleStartFitTalk = () => {
    navigate('/onboarding');  // <-- Redirect to /onboarding
  };
  return (
    <div className={sharePageWrap}>
      <div className={sharePageContainer}>
        <div className={sharePageTextContainer}>
          <div>
            <img src={chatCircle} />
          </div>
          <p className={sharePageTitle}>비오는 날 신기 좋은 레인부츠 추천</p>
          <p className={sharePageDate}>2024년 10월 30일</p>
        </div>
        <div className={sharePageBubbleContainer}>
          <UserBubble bubbleContent={'장마철에 신기 좋은 운동화 추천해줘'} />
          <ChatBotBubble bubbleContent={'장마철에 신기 좋은 운동화를 추천해 드리겠습니다'} />
          <div className={chatBotCardWrap}>
            <div className={productRecommendPreviewWrap}>


              <motion.ul className={productRecommendPreviewContainer}
                drag="x"
                dragConstraints={{ left: -60, right: 0 }}>
                {dummy.map((item) => (
                  <li key={item.id}>
                    <ProductRecommendationCard product={item} />
                  </li>

                ))}

                <div>
                  <div className={productRecommendPreviewMore}>
                    <img src={arrow_right} className={productRecommendPreviewMoreIcon} />
                    <p style={{ fontSize: '9px', marginTop: '6px' }}>더보기</p>
                  </div>
                </div>
              </motion.ul>
            </div>
          </div>

        </div>
        <div className={sharePageButtonContainer}>

          <Button text="핏톡 시작하기" onClick={handleStartFitTalk} />
        </div>
      </div>
    </div>
  );
}
export default SharePage