import { hamburger_menu } from '../../assets/assets';
import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import RecommendedQuestionCard from '../common/recommended-question-card/RecommendedQuestionCard';
import RecommendBox from './loginchatbot/recommendbox/RecommendBox';
import { fullContainer, recommendedquestioncardContainer } from './login.css';

const LoginHello = () => {
  const recommendedQuestions = [
    '비 오는날 신기 좋은 레인부츠 브랜드 알려줘',
    '요즘 등산할 때 신기 좋은 가벼운 등산화 추천해줘',
    '요즘 등산할 때 신기 좋은 가벼운 등산화 추천해줘',
  ];

  return (
    <>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ marginTop: '20px' }}>
          <ChatBotBox text={['반갑습니다 OO님!', 'OO님을 위한 맞춤 상품을 추천해 드릴게요.']} />
        </div>

        <div style={{ marginLeft: '44px' }}>
          <RecommendBox />
        </div>

        <div className={recommendedquestioncardContainer}>
          {recommendedQuestions.map((question, index) => (
            <RecommendedQuestionCard key={index} text={question} />
          ))}
        </div>

        <div style={{ marginTop: '10px' }}>
          <ChatbotSearchInput />
        </div>
      </div>
    </>
  );
};

export default LoginHello;
