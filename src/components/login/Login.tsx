import ChatBotBox from './loginchatbot/chatbotbox/ChatBotBox';
import ChatbotSearchInput from '../common/chatbot-search-input/ChatbotSearchInput';
import Header from '../common/header/Header';
import LoginButton from './loginchatbot/loginbox/LoginButton';
import { google, hamburger_menu } from '../../assets/assets';
import { loginbuttonContainer, loginbuttonTextContainer, fullContainer } from './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={fullContainer}>
        <Header imageSrc={hamburger_menu} alt="hamburger menu" />

        <div style={{ marginTop: '20px' }}>
          <ChatBotBox text={['안녕하세요 펄핏AI 입니다!', '맞춤 추천을 위해 먼저 로그인을 해주세요.']} />
        </div>

        <div className={loginbuttonContainer}>
          <LoginButton imageSrc={google} text="구글" onClick={() => navigate('')} />
          <LoginButton text="이메일 로그인" onClick={() => navigate('/emaillogin')} />
          <div className={loginbuttonTextContainer}>또는</div>
          <LoginButton text="회원가입 하기" onClick={() => navigate('/signupinfo')} />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <ChatbotSearchInput />
        </div>
      </div>
    </>
  );
};

export default Login;
