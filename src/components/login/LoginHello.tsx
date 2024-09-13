import { useMutation, useQuery } from '@tanstack/react-query';
import { onValue, push, ref } from 'firebase/database';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef, useState } from 'react';
import { chatCompletionsAPI, recommendQuestionAPI } from '../../api/chatRequests';
import { hamburger_menu } from '../../assets/assets';
import { database } from '../../firebase/firebase';
import LoadingPage from '../../pages/loading-page/loadingPage';
import useBrandStore from '../../stores/useBrandStore';
import useModalStore from '../../stores/useModalStore';
import useProductStore from '../../stores/useProductsStore';
import { TProduct } from '../../types/product';
import BrandPLP from '../chatbot/brand-plp/BrandPLP';
import BrandRecommendation from '../chatbot/brand-recommendation/BrandRecommendation';
import ChatBotBubble from '../chatbot/chatbot-bubble/ChatBotBubble';
import ProductRecommendationPreview from '../chatbot/product-recommendation-preview/ProductRecommendationPreview';
import ProductRecommendation from '../chatbot/product-recommendation/ProductRecommendation';
import UserBubble from '../chatbot/user-bubble/UserBubble';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import Modal from '../common/modal/Modal';
import RecommendedQuestionCard from '../common/recommended-question-card/RecommendedQuestionCard';
import ShareModal from '../common/share-modal/ShareModal';
import { batteryMargin, fullContainer, loginHelloContainer, recommendedquestioncardContainer } from './login.css';
import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import RecommendBox from './loginchatbot/recommendbox/RecommendBox';

type TQuestions = {
  question: string;
};

type QuestionList = TQuestions[];

type Brand = {
  brand: string;
  description: string;
  link: string;
  thumbnail: string;
};

type ChatItem = {
  id: string;
  userQuestion: string;
  botResponse: string;
  products: TProduct[] | null;
  brands: Brand[] | null;
  keywords: string;
};

const LoginHello = () => {
  const { setProducts } = useProductStore.getState();
  const { selectedBrand, setBrands } = useBrandStore();
  const { isShareModalOpen } = useModalStore()
  const [currentKeywords, setCurrentKeywords] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // Firebase에서 채팅 기록 불러오기
  useEffect(() => {
    const chatRef = ref(database, 'chatHistory');
    onValue(chatRef, snapshot => {
      const chatItems: ChatItem[] = [];
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        const id = childSnapshot.key; // 고유 키를 가져옴
        if (id) { // id가 존재할 때만 추가
          chatItems.push({ ...data, id }); // 데이터와 키를 함께 저장
        }
      });

      if (chatItems.length > 0) {
        setChatHistory(chatItems);
        const lastChatItem = chatItems[chatItems.length - 1];
        if (lastChatItem && lastChatItem.products) {
          setProducts(lastChatItem.products);
        }
        if (lastChatItem && lastChatItem.brands) {
          setBrands(lastChatItem.brands);
        }
        setCurrentKeywords(lastChatItem.keywords);
      }
    });
  }, [setProducts, setBrands]);


  // 추천 질문 불러오는 함수
  const {
    data: keywordsData,
    isLoading: isRecommendQuestionLoading,
    error: recommendQuestionError,
  } = useQuery<QuestionList>({
    queryKey: ['keywords'],
    queryFn: async () => {
      try {
        const response = await recommendQuestionAPI();
        console.log('추천 질문 데이터 확인용', response);
        return response.data;
      } catch (error) {
        console.error('추천 질문 불러오기 에러', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // 채팅 응답 함수
  const chatCompletionsMutation = useMutation({
    mutationFn: (question: string) => chatCompletionsAPI({ message: { content: question } }),
    onSuccess: (response, question) => {
      console.log('채팅 응답 성공:', response);

      const newChatItem: ChatItem = {
        id: push(ref(database, 'chatHistory')).key || '',
        userQuestion: question,
        botResponse: response.data.message,
        products: response.data.products || null,
        brands: response.data.brands || null,
        keywords: question,
      };
      push(ref(database, 'chatHistory'), newChatItem);
      setProducts(response.data.products);
      setBrands(response.data.brands);
      setCurrentKeywords(question);
    },
    onError: error => {
      console.error('채팅 응답 에러:', error);
    },
  });

  const handleQuestionSelect = (question: string) => {
    setCurrentKeywords(question);
    chatCompletionsMutation.mutate(question);
  };

  // 채팅 기록 변경 시 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  if (isRecommendQuestionLoading) return <LoadingPage />;
  if (recommendQuestionError) return <div>error:{recommendQuestionError?.message}</div>;

  return (
    <div className={fullContainer}>
      <div className={batteryMargin}></div>
      <Header imageSrc={hamburger_menu} alt="hamburger menu" />
      <div className={loginHelloContainer}>
        <div ref={chatContainerRef} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
          {' '}
          {/* 채팅 기록 컨테이너 */}
          <div style={{ marginTop: '20px' }}>
            <ChatBotBox text={['반갑습니다 OO님!', 'OO님을 위한 맞춤 상품을 추천해 드릴게요.']} />
          </div>
          <div style={{ marginLeft: '44px' }}>
            <RecommendBox />
          </div>
          {chatHistory.map((chat, index) => (
            <Fragment key={index}>
              <UserBubble bubbleContent={chat.userQuestion} />

              <ChatBotBubble bubbleContent={chat.botResponse} />
              {chat.brands && chat.brands.length > 0 && chat.id && (
                <div style={{ marginLeft: '28px' }}>
                  <BrandRecommendation brands={chat.brands} id={chat.id} />
                </div>
              )}
              {chat.products && chat.products.length > 0 && chat.id && (
                <div style={{ marginLeft: '28px' }}>
                  <ProductRecommendationPreview products={chat.products} id={chat.id} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      {chatHistory.length === 0 && (
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -550 }}
          whileTap={{ cursor: 'grabbing' }}
          className={recommendedquestioncardContainer}
        >
          {keywordsData &&
            keywordsData.map((question, index) => (
              <RecommendedQuestionCard
                key={index}
                text={question.question}
                onClick={() => handleQuestionSelect(question.question)}
              />
            ))}
        </motion.div>
      )}

      {chatHistory.length > 0 && (
        <Modal height="700px" initialHeight="25px">
          {selectedBrand ? <BrandPLP /> : <ProductRecommendation keywords={currentKeywords} />}
        </Modal>
      )}
      <ChatbotSearchInput chatCompletionsMutation={chatCompletionsMutation} />

      {isShareModalOpen && <ShareModal />}
    </div>
  );
};

export default LoginHello;
