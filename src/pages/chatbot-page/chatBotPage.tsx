import { useMutation, useQuery } from "@tanstack/react-query";
import { hamburger_menu } from "../../assets/assets";
import BrandPLP from "../../components/chatbot/brand-plp/BrandPLP";
import ChatBotBubble from "../../components/chatbot/chatbot-bubble/ChatBotBubble";
import ProductFitComment from "../../components/chatbot/product-fit-comment/ProductFitComment";
import ProductRecommendation from "../../components/chatbot/product-recommendation/ProductRecommendation";
import UserBubble from "../../components/chatbot/user-bubble/UserBubble";
import Button from "../../components/common/button/Button";
import ChatbotSearchInput from "../../components/common/chatbot-search-input/ChatbotSearchInput";

import { useEffect, useState } from "react";
import { chatKeywordsAPI, keywordsListAPI } from "../../api/chatRequests";
import ProductRecommendationPreview from "../../components/chatbot/product-recommendation-preview/ProductRecommendationPreview";
import Header from "../../components/common/header/Header";
import KeywordCard from "../../components/common/keyword-card/KeywordCard";
import Modal from "../../components/common/modal/Modal";
import useBrandStore from "../../stores/useBrandStore";
import useModalStore from "../../stores/useModalStore";
import useProductStore from "../../stores/useProductsStore";
import { TKeyWordsData } from "../../types/keywords";
import LoadingPage from "../loading-page/loadingPage";
import { chatBotCardWrap, chatBotContainer, chatBotModalWrap, chatBotWrap, chatBubbleWrap, keywordWrap } from "./chatBotPage.css";

type KeywordsList = string[]


const ChatBotPage = () => {
  const { selectedBrand } = useBrandStore()
  const { isOpen, fitOpen, isKeywordModalOpen, setKeywordModalOpen } = useModalStore();
  const { message, products } = useProductStore();
  const { setMessage, setProducts } = useProductStore.getState()
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [initialMessageShown, setInitialMessageShown] = useState(false);
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

  useEffect(() => {
    if (!initialMessageShown) {
      setMessage(`OO님, 가입을 환영합니다!\n선택하신 키워드에 따라 OO님께 맞춤형 상품을\n추천해드립니다! 관심 있는 키워드를 골라주세요.`);
      setInitialMessageShown(true);
    }
  }, [initialMessageShown, setMessage]);

  /**키워드 선택 함수 */
  const handleKeywordSelect = (keyword: string) => {
    setSelectedKeywords((prevSelected) =>
      prevSelected.includes(keyword)
        ? prevSelected.filter((item) => item !== keyword)  // 선택 해제
        : [...prevSelected, keyword]                       // 선택 추가
    );
  };


  const keywordMutation = useMutation({
    mutationFn: (data: TKeyWordsData) => chatKeywordsAPI(data),
    onSuccess: (response) => {
      console.log('키워드 전송 성공:', response)
      setKeywordModalOpen(false)
      setMessage(response.data.message)
      setProducts(response.data.products)
    },
    onError: (error) => {
      console.error('키워드 전송 실패:', error)
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨')
    }
  })

  const handleSubmit = () => {
    const chat: TKeyWordsData = { keywords: selectedKeywords };
    keywordMutation.mutate(chat)
  }
  //키워드 포맷
  const formattedKeywords = selectedKeywords.join(', ');



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
            {/* {products.length > 0 && <ProductRecommendationPreview />} */}
            <ChatBotBubble bubbleContent={message} />
            <div className={chatBotCardWrap}>
              {/* <FootSizeCard /> */}
              {/* <BrandRecommendation /> */}
              {products.length > 0 && <ProductRecommendationPreview />}
            </div>
            {selectedKeywords.length > 0 && <UserBubble bubbleContent={formattedKeywords} />}
          </div>
          <div className={chatBotModalWrap}>

            {!isOpen && !isKeywordModalOpen && <ChatbotSearchInput />} {/* 모달이 열렸을 때는 ChatbotSearchInput을 숨김 */}
            <Modal
              height="753px"
              initialHeight="120px"
            >
              {selectedBrand ? <BrandPLP /> : <ProductRecommendation keywords={formattedKeywords} />}
            </Modal>

            {fitOpen && <Modal height="758px" >
              <ProductFitComment />
            </Modal>}

            {/* 관심키워드 */}
            {isKeywordModalOpen &&
              <Modal height="360px" title="관심 키워드">
                <div className={keywordWrap}>
                  {keywordsData && keywordsData.map((item, index) => (
                    <KeywordCard key={index} text={item}
                      onClick={() => handleKeywordSelect(item)}  // 키워드 클릭 시 선택 처리
                      isSelected={selectedKeywords.includes(item)}
                    />
                  ))}
                  <div style={{ marginTop: '40px' }}>
                    <Button text={`${selectedKeywords.length}개 선택`} onClick={handleSubmit} />
                  </div>
                </div>
              </Modal>
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatBotPage