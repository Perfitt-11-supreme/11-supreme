import { theme } from '../styles/theme';
import ChatBotBox from './chatbotbox/ChatBotBox';
import ChatbotSearchInput from './common/chatbot-search-input/ChatbotSearchInput';
import Header from './common/header/Header';
import LoginButton from './loginbox/LoginButton';
import { hamburger_menu, kakao, naver } from '../assets/assets';

const Login = () => {
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
          <ChatBotBox text={['안녕하세요 펄핏AI 입니다!', '맞춤 추천을 위해 먼저 로그인을 해주세요.']} />
        </div>

        <div
          style={{
            marginTop: '-45px', //기본적으로 마진탑이 45px인데 왜 그런건지.....
            marginLeft: '44px',
            width: '200px',
            height: '190px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <LoginButton imageSrc={naver} text="네이버" />
          <LoginButton imageSrc={kakao} text="카카오" />
          <LoginButton text="이메일 로그인" />
          <div
            style={{
              fontSize: '14px',
              color: theme.color.black,
              fontWeight: '400',
              lineHeight: '22px',
              letterSpacing: '-0.003em',
              width: '184px',
              height: '22px',
              textAlign: 'center',
            }}
          >
            또는
          </div>
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
