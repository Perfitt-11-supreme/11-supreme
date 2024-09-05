import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import LoginButton from './loginchatbot/loginbox/LoginButton';
import { hamburger_menu, kakao, naver } from '../../assets/assets';
import { batteryMargin, loginbuttonContainer, loginbuttonTextContainer, fullContainer } from './login.css';

const Login = () => {
  return (
    <>
      <div className={fullContainer}>
        <div className={batteryMargin}></div>

        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ marginTop: '20px' }}>
          <ChatBotBox text={['안녕하세요 펄핏AI 입니다!', '맞춤 추천을 위해 먼저 로그인을 해주세요.']} />
        </div>

        <div className={loginbuttonContainer}>
          <LoginButton imageSrc={naver} text="네이버" />
          <LoginButton imageSrc={kakao} text="카카오" />
          <LoginButton text="이메일 로그인" />
          <div className={loginbuttonTextContainer}>또는</div>
          <LoginButton text="회원가입 하기" />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <ChatbotSearchInput />
        </div>
      </div>
    </>
  );
};

export default Login;
