import { hamburger_menu } from '../assets/assets';
import ChatBotBox from './chatbotbox/ChatBotBox';
import ChatbotSearchInput from './common/chatbot-search-input/ChatbotSearchInput';
import Header from './common/header/Header';
import RecommendedQuestionCard from './common/recommended-question-card/RecommendedQuestionCard';
import RecommendBox from './recommendbox/RecommendBox';

const LoginHello = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '375px',
          height: '812px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            height: '34px',
          }}
        ></div>

        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ marginTop: '20px' }}>
          <ChatBotBox text={['반갑습니다 OO님!', 'OO님을 위한 맞춤 상품을 추천해 드릴게요.']} />
        </div>

        <div style={{ marginTop: '-36px', marginLeft: '44px' }}>
          <RecommendBox />
        </div>

        <div
          style={{
            display: 'flex',
            overflowX: 'hidden',
            gap: '8px',
            marginTop: 'auto',
          }}
        >
          <RecommendedQuestionCard text="비 오는날 신기 좋은 레인부츠 브랜드 알려줘" />
          <RecommendedQuestionCard text="요즘 등산할 때 신기 좋은 가벼운 등산화 추천해줘" />
          <RecommendedQuestionCard text="요즘 등산할 때 신기 좋은 가벼운 등산화 추천해줘" />
        </div>

        <div style={{ marginTop: '10px' }}>
          <ChatbotSearchInput />
        </div>
      </div>
    </>
  );
};

export default LoginHello;
