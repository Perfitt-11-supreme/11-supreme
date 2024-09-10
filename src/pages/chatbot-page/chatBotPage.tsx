import { useQuery } from "@tanstack/react-query";
import { hamburger_menu } from "../../assets/assets";
import BrandPLP from "../../components/chatbot/brand-plp/BrandPLP";
import BrandRecommendation from "../../components/chatbot/brand-recommendation/BrandRecommendation";
import ChatBotBubble from "../../components/chatbot/chatbot-bubble/ChatBotBubble";
import FootSizeCard from "../../components/chatbot/foot-size-card/FootSizeCard";
import ProductFitComment from "../../components/chatbot/product-fit-comment/ProductFitComment";
import ProductRecommendationPreview from "../../components/chatbot/product-recommendation-preview/ProductRecommendationPreview";
import ProductRecommendation from "../../components/chatbot/product-recommendation/ProductRecommendation";
import UserBubble from "../../components/chatbot/user-bubble/UserBubble";
import Button from "../../components/common/button/Button";
import ChatbotSearchInput from "../../components/common/chatbot-search-input/ChatbotSearchInput";

import { useState } from "react";
import { keywordsListAPI } from "../../api/chatRequests";
import Header from "../../components/common/header/Header";
import KeywordCard from "../../components/common/keyword-card/KeywordCard";
import Modal from "../../components/common/modal/Modal";
import useBrandStore from "../../stores/useBrandStore";
import useModalStore from "../../stores/useModalStore";
import LoadingPage from "../loading-page/loadingPage";
import { chatBotCardWrap, chatBotContainer, chatBotModalWrap, chatBotWrap, chatBubbleWrap, keywordWrap } from "./chatBotPage.css";

type KeywordsList = string[]


const ChatBotPage = () => {
  const { selectedBrand } = useBrandStore()
  const { isOpen, fitOpen, isKeywordModalOpen } = useModalStore();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 키워드 리스트 불러오기
  const { data: keywordsData, isLoading: isKeywordsLoading, error: keywordsError } = useQuery<KeywordsList>({
    queryKey: ['keywords'],
    queryFn: async () => {
      try {
        const response = await keywordsListAPI();
        console.log("데이터 확인용", response)
        return response.data
      } catch (error) {
        console.error('키워드 정보 불러오기 에러', error)
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

  })

  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((item) => item !== keyword)  // 선택 해제
        : [...prevSelected, keyword]                       // 선택 추가
    );
  };




  if (isKeywordsLoading) return <LoadingPage />
  if (keywordsError) return <div>
    error:{keywordsError?.message}
  </div>


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

            {!isOpen && !isKeywordModalOpen && <ChatbotSearchInput />} {/* 모달이 열렸을 때는 ChatbotSearchInput을 숨김 */}
            <Modal
              height="758px"
              initialHeight="120px"
            >
              {selectedBrand ? <BrandPLP /> : <ProductRecommendation />}
            </Modal>

            {fitOpen && <Modal height="758px" >
              <ProductFitComment />
            </Modal>}

            {/* 관심키워드 */}
            <Modal height="360px" title="관심 키워드">
              <div className={keywordWrap}>
                {keywordsData && keywordsData.map((item, index) => (
                  <KeywordCard key={index} text={item}
                    onClick={() => handleKeywordSelect(item)}  // 키워드 클릭 시 선택 처리
                    isSelected={selectedKeywords.includes(item)}
                  />
                ))}
                <div style={{ marginTop: '40px' }}>
                  <Button text={`${selectedKeywords.length}개 선택`} />
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotPage