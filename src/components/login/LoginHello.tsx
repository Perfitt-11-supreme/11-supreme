import { useMutation, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { chatCompletionsAPI, recommendQuestionAPI } from '../../api/chatRequests';
import { hamburger_menu } from '../../assets/assets';
import LoadingPage from '../../pages/loading-page/loadingPage';
import useProductStore from '../../stores/useProductsStore';
import ChatBotBubble from '../chatbot/chatbot-bubble/ChatBotBubble';
import UserBubble from '../chatbot/user-bubble/UserBubble';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import RecommendedQuestionCard from '../common/recommended-question-card/RecommendedQuestionCard';
import { fullContainer, loginHelloContainer, recommendedquestioncardContainer } from './login.css';
import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import RecommendBox from './loginchatbot/recommendbox/RecommendBox';

type TQuestions = {
  question: string;
}

type QuestionList = TQuestions[]

const LoginHello = () => {
  const { message } = useProductStore();
  const { setMessage, setProducts } = useProductStore.getState()
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  // 추천 질문 불러오는 함수
  const { data: keywordsData, isLoading: isRecommendQuestionLoading, error: recommendQuestionError } = useQuery<QuestionList>({
    queryKey: ['keywords'],
    queryFn: async () => {
      try {
        const response = await recommendQuestionAPI();
        console.log("데이터 확인용", response)
        return response.data
      } catch (error) {
        console.error('추천 질문 불러오기 에러', error)
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

  })

  // 채팅 응답 함수
  const chatCompletionsMutation = useMutation({
    mutationFn: (question: string) => chatCompletionsAPI({ message: { content: question } }),
    onSuccess: (response) => {
      console.log('채팅 응답 성공:', response);
      setMessage(response.data.message)
      setProducts(response.data.products)
    },
    onError: (error) => {
      console.error('채팅 응답 에러:', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨')
    }
  });

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
    chatCompletionsMutation.mutate(question);
  };


  if (isRecommendQuestionLoading) return <LoadingPage />
  if (recommendQuestionError) return <div>error:{recommendQuestionError?.message}</div>


  return (
    <>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />
        <div className={loginHelloContainer}>
          <div style={{ marginTop: '20px' }}>
            <ChatBotBox text={['반갑습니다 OO님!', 'OO님을 위한 맞춤 상품을 추천해 드릴게요.']} />
          </div>

          <div style={{ marginTop: '-36px', marginLeft: '44px' }}>
            <RecommendBox />
          </div>
          {selectedQuestion && <UserBubble bubbleContent={selectedQuestion} />}
          <ChatBotBubble bubbleContent={message} />
        </div>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -550 }} // 왼쪽으로 200px만큼 드래그 가능
          whileTap={{ cursor: "grabbing" }}
          className={recommendedquestioncardContainer}>
          {keywordsData && keywordsData.map((question, index) => (
            <RecommendedQuestionCard key={index} text={question.question} onClick={() => handleQuestionSelect(question.question)} />
          ))}
        </motion.div>

        <ChatbotSearchInput />

      </div>
    </>
  );
};

export default LoginHello;
